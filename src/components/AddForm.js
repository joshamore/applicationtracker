import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));

export default function AddForm() {
	const classes = useStyles();

	// Storing state of form using hooks
	const [jobTitle, setjobTitle] = useState("");
	const [jobCompany, setjobCompany] = useState("");
	const [jobLink, setjobLink] = useState("");

	return (
		<div>
			<Container maxWidth="md">
				<form className={classes.root} noValidate autoComplete="off">
					<TextField
						id="jobTitle"
						label="Job Title"
						value={jobTitle}
						onChange={(e) => setjobTitle(e.target.value)}
					/>
					<TextField
						id="jobCompany"
						label="Company Name"
						value={jobCompany}
						onChange={(e) => setjobCompany(e.target.value)}
					/>
					<TextField
						id="jobLink"
						label="Link to Ad"
						value={jobLink}
						onChange={(e) => setjobLink(e.target.value)}
					/>
					<br />
					<Button id="addApplication" variant="contained" color="primary">
						Add Application
					</Button>
				</form>
			</Container>
		</div>
	);
}
