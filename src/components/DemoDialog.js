import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DemoDialog({ dialogSwitch, setEmail, setPassword }) {
	const [open, setOpen] = useState(true);

	// Generic close handler
	const handleClose = () => {
		setOpen(false);
		dialogSwitch(false);
	};

	// Handler if using demo
	const useDemo = () => {
		// Setting login state
		setPassword("TestingtonTestington");
		setEmail("test@jobmate.work");

		// CLosing dialog
		handleClose();
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"⚠️ Using Demo Account ⚠️"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						The demo account is a <strong>publicly accessible</strong> account.
						Any data entered into the demo account will be deleted within 7 days
						and can be seen by anyone else using the demo.
					</DialogContentText>
					<DialogContentText id="alert-dialog-description">
						<strong>
							Please do not enter any private data or data you would like to
							keep.
						</strong>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose} color="primary">
						Do Not Use Demo
					</Button>
					<Button
						variant="contained"
						onClick={useDemo}
						color="default"
						autoFocus
					>
						Use Demo
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
