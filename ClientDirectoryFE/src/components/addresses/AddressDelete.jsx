import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { createClient, editClient } from "../../services/customer.service";
import { useEffect, useState } from "react";
import { useAsync, useFetchAndLoad } from "../../hooks/common";
import { routes } from "../../router";
import { deleteAddress } from "../../services/address.service";

const AddressDelete = ({ data, open, handleClose, onDeleteAddress }) => {
	const { loading, callEndpoint } = useFetchAndLoad();
	const request = async () => await callEndpoint(deleteAddress({ id: data.id }));

	const handleDelete = () => {
		request()
			.then((result) => {
				handleClose();
				onDeleteAddress();
			})
			.catch((err) => {
				console.log("error", err);
			});
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Delete Address</DialogTitle>
			<DialogContent>
				Are you sure you wanna delete the address <b>{data.name}</b>?
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

export default AddressDelete;
