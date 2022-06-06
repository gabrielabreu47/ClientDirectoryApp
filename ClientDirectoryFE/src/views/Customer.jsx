import { CustomerForm, CustomerList } from "../components/customers";
import LoadingPage from "./LoadingPage";
import customerService from "../services/customer.service";
import { Box, Fab } from "@mui/material";
import { PaginationArrows } from "../components/common";
import { usePaginationRequest } from "../hooks/common";
import { customToasts } from "../helpers";
import { useToggle } from "../hooks/common";
import AddIcon from "@mui/icons-material/Add";

const Customer = () => {
	const [dialogOpen, dialogToggle] = useToggle(false);

	const handleSuccesRequest = () => {};

	const handleDataEnded = (message) => {
		customToasts.toastInfo(message);
	};

	const { data, goBack, goForward, loading } = usePaginationRequest(
		customerService.getClients,
		handleSuccesRequest,
		handleDataEnded
	);

	if (loading) return <LoadingPage loading={loading} />;

  return (
    <>
      <h1 className="title" >Clients</h1>
      <Box sx={{ width: '80%', margin: 'auto' }}>
        <CustomerList customers={data} />
      </Box>
      <Box>
        <PaginationArrows onClickBack={goBack} onClickForward={goForward} />
      </Box>
      <CustomerForm open={dialogOpen} handleClose={dialogToggle} />
      <Fab
        color="primary"
        sx={{
          position: 'absolute',
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        onClick={dialogToggle}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default Customer;
