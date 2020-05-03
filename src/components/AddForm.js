import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Spinner from "./Spinner";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));

export default function AddForm({ addApplication }) {
	const classes = useStyles();

	// Storing state of form using hooks
	const [jobTitle, setjobTitle] = useState("");
	const [jobCompany, setjobCompany] = useState("");
	const [jobLink, setjobLink] = useState("");

	// Stores spinner state
	const [formSubmitted, setFormSubmitted] = useState(false);

	// Hook used for redirect
	let history = useHistory();

	return (
		<div>
			<Container maxWidth="md">
				{!formSubmitted ? (
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
						<Button
							id="addApplication"
							variant="contained"
							color="primary"
							onClick={(e) => {
								setFormSubmitted(true);

								// Passing job application data to parent component
								addApplication({
									jobTitle: jobTitle,
									jobCompany: jobCompany,
									jobLink: jobLink,
								})
									.then((res) => {
										if (res) {
											// Redirecting to dashboard
											history.push("/dashboard");
										} else {
											// Rerendering form
											setFormSubmitted(false);
										}
									})
									.catch((err) => {
										console.log(err);
										setFormSubmitted(false);
									});
							}}
						>
							Add Application
						</Button>
					</form>
				) : (
					<Spinner />
				)}
			</Container>
		</div>
	);
}
