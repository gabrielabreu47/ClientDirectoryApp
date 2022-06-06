import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

const CustomerForm = ({ open, entity, handleClose }) => {
	const [entity, setEntity] = useState({
		name: "",
		lastName: "",
		birthDate: "",
		dni: "",
		profession: "",
	});

	return (
		<Dialog open={open} onClose={handleClose}>
			<form method="POST" onSubmit={handleSubmit}>
				<DialogTitle>Subscribe</DialogTitle>
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
						value={entity.birthName}
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
					<Button type="submit">Subscribe</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default CustomerForm;
