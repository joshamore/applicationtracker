import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LinearLoader from "./LinearLoader";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	buttonBuffer: {
		marginLeft: 10,
	},
});

export default function DeleteJob({ applicationID }) {
	const classes = useStyles();

	// Hook used for redirect
	let history = useHistory();

	// Setting state
	const [open, setOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const deleteJob = async () => {
		// Setting loading state
		setIsDeleting(true);

		// Delete Confirm var
		let confirm;

		// Getting token
		const token = localStorage.getItem("token");

		try {
			// Attempting to delete application
			confirm = await fetch(
				`http://localhost:5000/api/application/?id=${applicationID}`,
				{
					method: "DELETE",
					headers: {
						"auth-token": token,
					},
				}
			);
			confirm = await confirm.json();

			if (confirm.success === true) {
				setIsDeleting(false);
				setOpen(false);

				// Redirecting to dashboard after delete
				history.push("/dashboard");
			} else {
				throw Error(confirm.err);
			}
		} catch (err) {
			// TODO: real error handling needed
			console.log(
				`ERROR DELETING APPLICATION: ${applicationID} ERROR:  ${err}`
			);

			setIsDeleting(false);
			setOpen(false);
		}
	};

	// Setting linear loader if delete in progress
	if (isDeleting) {
		return (
			<div>
				<Button
					className={classes.buttonBuffer}
					variant="contained"
					color="secondary"
					size="small"
					onClick={handleClickOpen}
				>
					Delete
					<DeleteIcon />
				</Button>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
				>
					<LinearLoader />
					<DialogTitle id="form-dialog-title">
						Delete Job Application
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Clicking Yes below will remove this job application and all
							related items. <strong>Are you sure</strong>?
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</div>
		);
	} else {
		return (
			<div>
				<Button
					className={classes.buttonBuffer}
					variant="contained"
					color="secondary"
					size="small"
					onClick={handleClickOpen}
				>
					Delete
					<DeleteIcon />
				</Button>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						Delete Job Application
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Clicking Yes below will remove this job application and all
							related items. <strong>Are you sure</strong>?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							No, keep my application
						</Button>
						<Button onClick={deleteJob} color="secondary">
							Yes, delete my application
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
