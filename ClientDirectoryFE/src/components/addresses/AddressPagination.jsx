import AddressList from "./AddressList";
import LoadingBox from "../common/LoadingBox";
import addressService from "../../services/address.service";
import { Box } from "@mui/material";
import { PaginationArrows } from "../common";
import { usePaginationRequest } from "../../hooks/common";
import { customToasts } from "../../helpers";
import { useEffect } from "react";

const AddressPagination = ({ clientId, onAdd }) => {
	const handleSuccesRequest = (data) => {};

	const handleDataEnded = (message) => {
		customToasts.toastInfo(message);
	};

	const onDeleteAddress = () => {
		makeRecall();
	};

	const { data, goBack, goForward, loading, makeRecall } = usePaginationRequest(
		addressService.getAddressOfClient,
		handleSuccesRequest,
		handleDataEnded,
		{ clientId }
	);

	useEffect(() => {
		if (onAdd === true) makeRecall();
	}, [onAdd]);

	if (loading) return <LoadingBox loading={loading} />;

	return (
		<>
			<AddressList addresses={data} onDeleteAddress={onDeleteAddress} />
			<Box>
				<PaginationArrows onClickBack={goBack} onClickForward={goForward} />
			</Box>
		</>
	);
};

export default AddressPagination;
