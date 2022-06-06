import { Stack, Grid, Avatar, Card, CardContent, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { customerShape } from "./propTypeModels";
import { stringAvatar } from "../../helpers";

const minCardStyles = {
	minWidth: 200,
	maxWidth: 500,
	width: "20%",
	"&:hover": {
		cursor: "pointer",
		backgroundColor: "#f5f5f5",
	},
};

const bigCardStyle = {
	minWidth: 800,
	maxHeight: 700,
	width: "90%",
	boxShadow: "none",
};

const primaryFont = {
	fontFamily: "Roboto",
	fontSize: "1.3em",
};

const secondaryFont = {
	...primaryFont,
	fontSize: "1em",
};

const Detail = ({ fullDetail, fullName, customer, onClick, ...props }) => {
	return (
		<Card {...props} sx={minCardStyles} onClick={onClick}>
			<CardContent>
				<Stack justifyContent="center" alignItems="center">
					<Avatar style={{ marginBottom: "1em", width: 56, height: 56 }} {...stringAvatar(fullName)} />
					<Typography sx={primaryFont}>{fullName}</Typography>
					{/* <Typography sx={secondaryFont}>{customer.profession}</Typography> */}
				</Stack>
			</CardContent>
		</Card>
	);
};

const FullDetail = ({ fullDetail, fullName, customer, onClick, ...props }) => {
	return (
		<Card {...props} sx={bigCardStyle} onClick={onClick}>
			<CardContent style={{ display: "flex" }}>
				<div>
					<div>
						<Avatar
							style={{ height: "15vmax", width: "15vmax", fontSize: "8vmax" }}
							{...stringAvatar(fullName)}
						/>
					</div>
				</div>
				<div
					style={{
						width: "100%",
						display: "flex",
						padding: "2vmax",
						flexDirection: "column",
					}}>
					<div style={{ width: "100%", fontSize: "3vmax", textAlign: "left" }}>
						<b>{fullName}</b>
					</div>
					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginTop: "2vmax",
						}}>
						<div style={{ width: "100%" }}>
							<b>Birth Date: </b>
							<br />
							<span>{customer.birthDate}</span>
						</div>
						<div style={{ width: "100%" }}>
							<b>DNI: </b>
							<br />
							<span>{customer.dni}</span>
						</div>
						<div style={{ width: "100%" }}>
							<b>Profession: </b>
							<br />
							<span>{customer.profession}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const CustomerCard = (props) => {
	const fullName = `${props.customer.name} ${props.customer.lastName}`;
	const joindedProps = {
		fullName,
		...props,
	};

	const { fullDetail } = props;

	return fullDetail ? <FullDetail {...joindedProps} /> : <Detail {...joindedProps} />;
};

CustomerCard.propTypes = {
	customer: PropTypes.shape(customerShape),
};

export default CustomerCard;
