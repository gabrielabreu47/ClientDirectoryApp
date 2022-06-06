import { useState } from "react";
import { useAsync, useFetchAndLoad, useToggle } from "../hooks/common";
import { useRoute } from "wouter";
import { routes } from "../router";
import { CustomerCard, CustomerForm } from "../components/customers";
import { Box, Stack, Fab } from "@mui/material";
import customerService from "../services/customer.service";
import LoadingPage from "./LoadingPage";
import { AddressPagination } from "../components/addresses";
import EditIcon from "@mui/icons-material/Edit";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteCustomer from "../components/customers/DeleteCustomer";
import AddressForm from "../components/addresses/AddressForm";

export const CustomerDetails = () => {
	const [_match, params] = useRoute(routes.customer.details);

	const { id } = params ?? { id: 0 };

	const [customer, setCustomer] = useState({
		name: "",
		lastName: "",
		birthDate: "",
		dni: "",
		profession: "",
		addresses: [],
	});
	const { loading, callEndpoint } = useFetchAndLoad();
	const [customerDialogOpen, customerDialogToggle] = useToggle(false);
	const [addressDialogOpen, addressDialogToggle] = useToggle(false);
	const [deleteDialogOpen, deleteDialogToggle] = useToggle(false);
	const [onAdd, setOnAdd] = useState();

	const request = async () => await callEndpoint(customerService.getClientDetails({ id }));

	const handleSuccesRequest = (data) => {
		setCustomer(data);
	};

	useAsync({ request, handleSuccesRequest });

	if (loading) return <LoadingPage loading={loading} />;

	if (!customer)
		return (
			<Box>
				<Stack spacing={2} direction="row" justifyContent="center">
					<CustomerCard
						customer={{
							id: 0,
							name: "No",
							lastName: "Encontrado",
						}}
					/>
				</Stack>
			</Box>
		);

	const onAddAddress = () => {
		setOnAdd(true);
	};

	return (
		<>
			<Box sx={{ padding: "2em" }}>
				<Stack spacing={2} direction="row" justifyContent="center">
					<CustomerCard fullDetail customer={customer} />
				</Stack>
			</Box>
			<Box sx={{ width: "80%", margin: "auto" }}>
				<AddressPagination clientId={id} onAdd={onAdd} />
			</Box>
			<Fab
				color="primary"
				sx={{
					position: "relative",
				}}
				onClick={addressDialogToggle}>
				<AddLocationIcon />
			</Fab>
			<AddressForm
				customerId={customer.id}
				open={addressDialogOpen}
				handleClose={addressDialogToggle}
				onAddAddress={onAddAddress}
			/>
			<CustomerForm data={customer} open={customerDialogOpen} handleClose={customerDialogToggle} />
			<DeleteCustomer data={customer} open={deleteDialogOpen} handleClose={deleteDialogToggle} />
			<Fab
				color="primary"
				sx={{
					position: "absolute",
					bottom: (theme) => theme.spacing(10),
					right: (theme) => theme.spacing(2),
				}}
				onClick={customerDialogToggle}>
				<EditIcon />
			</Fab>
			<Fab
				color="error"
				sx={{
					position: "absolute",
					bottom: (theme) => theme.spacing(2),
					right: (theme) => theme.spacing(2),
				}}
				onClick={deleteDialogToggle}>
				<DeleteForeverIcon />
			</Fab>
		</>
	);
};

export default CustomerDetails;
