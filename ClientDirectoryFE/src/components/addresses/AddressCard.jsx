import { Grid, Card, CardContent, Typography, Fab } from "@mui/material";
import { PropTypes } from "prop-types";
import { addressShape } from "./propTypeModels";
import EditIcon from "@mui/icons-material/Edit";
import { useFetchAndLoad, useToggle } from "../../hooks/common";
import AddressForm from "./AddressForm";
import { useState } from "react";
import AddressDelete from "./AddressDelete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const cardStyles = {
	position: "relative",
	minWidth: 100,
	maxWidth: 500,
	width: "50%",
	"&:hover": {
		cursor: "pointer",
		backgroundColor: "#f5f5f5",
	},
};

const AddressCard = ({ address, onClick, onDeleteAddress, ...props }) => {
	const [dialogOpen, dialogToggle] = useToggle(false);
	const [fullAddress, setFullAddress] = useState({});

	return (
		<Card {...props} sx={cardStyles} onClick={onClick}>
			<AddressDelete
				data={{ id: address.id, name: address.label }}
				open={dialogOpen}
				handleClose={dialogToggle}
				onDeleteAddress={onDeleteAddress}
			/>
			<Fab
				style={{ width: "5vmin", height: "5vmin" }}
				color="error"
				sx={{
					position: "absolute",
					top: (theme) => theme.spacing(2),
					right: (theme) => theme.spacing(2),
				}}
				onClick={dialogToggle}>
				<DeleteForeverIcon />
			</Fab>
			<CardContent>
				<h2>{address.label}</h2>
				<Grid container spacing={2}>
					<Grid item>
						<Typography>{address.address}</Typography>
						<Typography>{address.city}</Typography>
					</Grid>
					<Grid item xs>
						<Typography>{address.state}</Typography>
						<Typography>{address.country}</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

AddressCard.propTypes = {
	address: PropTypes.shape(addressShape),
};

export default AddressCard;
