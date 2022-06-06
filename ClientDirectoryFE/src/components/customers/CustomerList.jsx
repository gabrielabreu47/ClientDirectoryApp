import { PropTypes } from "prop-types";
import { customerShape } from "./propTypeModels";
import CustomerCard from "./CustomerCard";
import { Stack } from "@mui/material";
import { Link } from "wouter";
import { routes } from "../../router";

const CustomerList = ({ customers, onDeleteCustomer }) => {
	return (
		<Stack direction="row" style={{ flexWrap: "wrap", gap: "1vmax", justifyContent: "space-between" }}>
			{customers.map((customer) => (
				<Link key={customer.id} href={routes.customer.details.replace(":id", customer.id)}>
					<CustomerCard customer={customer} onDeleteCustomer={onDeleteCustomer} />
				</Link>
			))}
		</Stack>
	);
};

CustomerList.propTypes = {
	customers: PropTypes.arrayOf(PropTypes.exact(customerShape)),
};

export default CustomerList;
