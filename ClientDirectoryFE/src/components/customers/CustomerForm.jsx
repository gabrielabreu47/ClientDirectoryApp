import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { createClient, editClient } from "../../services/customer.service";
import { useEffect, useState } from "react";
import { useAsync, useFetchAndLoad } from "../../hooks/common";

const getCorrectdate = (date) => {
	const dates = date.split("/");
	return `${dates[2]}-${dates[1]}-${dates[0]}`;
};

const CustomerForm = ({ data, open, handleClose }) => {
	const [entity, setEntity] = useState({
		name: "",
		lastName: "",
		birthDate: "",
		dni: "",
		profession: "",
		addresses: [],
	});

	const handleChange = (e) => {
		const prop = e.target.id;
		const value = e.target.value;

		setEntity({ ...entity, [prop]: value });
	};

	useEffect(() => {
		if (data) {
			setEntity({ ...data, birthDate: getCorrectdate(data.birthDate) });
		}
	}, [data]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!data)
			requestCreate()
				.then((result) => {
					handleClose();
				})
				.catch((err) => {
					console.log("Error", { err });
				});
		else if (data)
			requestEdit()
				.then((result) => {
					handleClose();
				})
				.catch((err) => {
					console.log("Error", { err });
				});
	};

	const { loading, callEndpoint } = useFetchAndLoad();
	const requestCreate = async () => await callEndpoint(createClient({ clientData: entity }));
	const requestEdit = async () => await callEndpoint(editClient({ clientData: entity }));

	return (
		<Dialog open={open} onClose={handleClose}>
			<form method="POST" onSubmit={handleSubmit}>
				<DialogTitle>{data ? "Edit Customer" : "Subscribe"}</DialogTitle>
				<DialogContent>
					<TextField
						required
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						type="text"
						fullWidth
						variant="standard"
						InputLabelProps={{
							shrink: true,
						}}
						value={entity.name}
						onChange={handleChange}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						id="lastName"
						label="Last Name"
						type="text"
						fullWidth
						variant="standard"
						InputLabelProps={{
							shrink: true,
						}}
						value={entity.lastName}
						onChange={handleChange}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						id="birthDate"
						label="Birth Name"
						type="date"
						fullWidth
						variant="standard"
						InputLabelProps={{
							shrink: true,
						}}
						value={entity.birthDate}
						onChange={handleChange}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						id="dni"
						label="DNI"
						type="number"
						fullWidth
						variant="standard"
						InputLabelProps={{
							shrink: true,
						}}
						value={entity.dni}
						onChange={handleChange}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						id="profession"
						label="Profession"
						type="text"
						fullWidth
						variant="standard"
						InputLabelProps={{
							shrink: true,
						}}
						value={entity.profession}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">{data ? "Save" : "Subscribe"}</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default CustomerForm;
