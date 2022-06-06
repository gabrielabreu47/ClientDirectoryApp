import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAsync, useFetchAndLoad } from "../../hooks/common";
import { createAddress, editAddress, getCities, getCountries, getStates } from "../../services/address.service";

const addressType = [
	{
		value: 0,
		label: "Home",
	},
	{
		value: 1,
		label: "Work",
	},
	{
		value: 2,
		label: "Other",
	},
];

const AddressForm = ({ customerId, data, open, handleClose, onAddAddress }) => {
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [entity, setEntity] = useState({
		clientId: 0,
		label: "",
		address: "",
		addressType: "",
		countryId: "",
		stateId: "",
		cityId: "",
	});

	const getCountry = () => {
		requestCountries()
			.then((result) => {
				setCountries(result.data);
			})
			.catch((err) => console.log("Error", err));
	};

	const getState = (countryId) => {
		if (countryId) {
			requestStates(countryId)
				.then((result) => {
					setStates(result.data);
				})
				.catch((err) => console.log("Error", err));
		}
	};

	const getCity = (stateId) => {
		if (stateId) {
			requestCities(stateId)
				.then((result) => {
					setCities(result.data);
				})
				.catch((err) => console.log("Error", err));
		}
	};

	const handleCountry = (e) => {
		handleChange(e);
		getState(e.target.value);
	};

	const handleState = (e) => {
		handleChange(e);
		getCity(e.target.value);
	};

	const handleChange = (e) => {
		const prop = e.target.id || e.target.name;
		const value = e.target.value;

		setEntity({ ...entity, [prop]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!data)
			requestCreate()
				.then((result) => {
					handleClose();
					onAddAddress();
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
	const requestCountries = async () => await callEndpoint(getCountries());
	const requestStates = async (countryId) => await callEndpoint(getStates({ countryId: countryId }));
	const requestCities = async (stateId) => await callEndpoint(getCities({ stateId: stateId }));
	const requestCreate = async () => await callEndpoint(createAddress({ addressData: entity }));
	const requestEdit = async () => await callEndpoint(editAddress({ addressData: entity }));

	useEffect(() => {
		if (open === true) {
			setEntity({ ...entity, clientId: customerId });
			getCountry();
		}
	}, [open]);

	useEffect(() => {
		if (data) setEntity(data);
	}, [data]);

	return (
		<Dialog open={open} onClose={handleClose}>
			<form method="POST" onSubmit={handleSubmit}>
				<DialogTitle>{data ? "Edit" : "Add"} Address</DialogTitle>
				<DialogContent>
					<TextField
						required
						autoFocus
						margin="dense"
						id="label"
						label="Label"
						type="text"
						fullWidth
						variant="standard"
						value={entity.label}
						onChange={handleChange}
					/>
					<TextField
						required
						multiline
						margin="dense"
						id="address"
						label="Address"
						type="text"
						fullWidth
						variant="standard"
						value={entity.address}
						onChange={handleChange}
					/>
					<FormControl variant="standard" sx={{ width: "100%" }}>
						<InputLabel id="typeLabel">Address Type</InputLabel>
						<Select
							required
							fullWidth
							labelId="typeLabel"
							id="addressType"
							name="addressType"
							value={entity.addressType}
							onChange={handleChange}
							label="Address Type">
							<MenuItem value="">
								<em>Seleccione una opcion</em>
							</MenuItem>
							{addressType.map((type, key) => (
								<MenuItem key={key} value={type.value}>
									{type.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl variant="standard" sx={{ width: "100%" }}>
						<InputLabel id="countryLabel">Country</InputLabel>
						<Select
							required
							fullWidth
							labelId="countryLabel"
							id="countryId"
							name="countryId"
							value={entity.countryId}
							onChange={handleCountry}
							label="Country">
							<MenuItem value="">
								<em>Seleccione una opcion</em>
							</MenuItem>
							{countries.map((country) => (
								<MenuItem key={country.id} value={country.id}>
									{country.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl variant="standard" sx={{ width: "100%" }}>
						<InputLabel id="stateLabel">State</InputLabel>
						<Select
							required
							fullWidth
							labelId="stateLabel"
							id="stateId"
							name="stateId"
							value={entity.stateId}
							onChange={handleState}
							label="State">
							<MenuItem value="">
								<em>Seleccione una opcion</em>
							</MenuItem>
							{states.map((state) => (
								<MenuItem key={state.id} value={state.id}>
									{state.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl variant="standard" sx={{ width: "100%" }}>
						<InputLabel id="cityLabel">City</InputLabel>
						<Select
							required
							fullWidth
							labelId="cityLabel"
							id="cityId"
							name="cityId"
							value={entity.cityId}
							onChange={handleChange}
							label="City">
							<MenuItem value="">
								<em>Seleccione una opcion</em>
							</MenuItem>
							{cities.map((city) => (
								<MenuItem key={city.id} value={city.id}>
									<em>{city.name}</em>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Save</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AddressForm;
