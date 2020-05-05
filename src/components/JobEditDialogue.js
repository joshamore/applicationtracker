import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function JobEditDialogue({ jobUpdate }) {
	const [open, setOpen] = useState(false);
	const [jobTitle, setjobTitle] = useState("");
	const [jobCompany, setjobCompany] = useState("");
	const [jobLink, setjobLink] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const updateJob = () => {
		setOpen(false);
		jobUpdate({
			jobTitle: jobTitle,
			jobCompany: jobCompany,
			jobLink: jobLink,
		});
	};

	return (
		<div>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				Edit
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>Update job application details.</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="jobTitle"
						label="Job Title"
						type="text"
						value={jobTitle}
						onChange={(e) => setjobTitle(e.target.value)}
						fullWidth
					/>
					<TextField
						margin="dense"
						id="jobCompany"
						label="Company"
						type="text"
						fullWidth
						value={jobCompany}
						onChange={(e) => setjobCompany(e.target.value)}
					/>
					<TextField
						margin="dense"
						id="jobLink"
						label="Link to Ad"
						type="text"
						fullWidth
						value={jobLink}
						onChange={(e) => setjobLink(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={updateJob} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
