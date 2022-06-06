import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { createClient, editClient } from "../../services/customer.service";
import { useEffect, useState } from "react";
import { useAsync, useFetchAndLoad } from "../../hooks/common";
import { routes } from "../../router";

const DeleteCustomer = ({ data, open, handleClose }) => {
	const { loading, callEndpoint } = useFetchAndLoad();
	const request = async () => await callEndpoint(createClient({ id: data.id }));

	const handleDelete = () => {
		request()
			.then((result) => {
				handleClose();
				location.replace(routes.customer.all);
			})
			.catch((err) => {
				console.log("error", err);
			});
	};
	const fullName = `${data.name} ${data.lastName}`;

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Delete Customer</DialogTitle>
			<DialogContent>
				Are you sure you wanna delete the customer <b>{fullName}</b>?
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button variant="outlined" type="submit" color="error" onClick={handleDelete}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteCustomer;
