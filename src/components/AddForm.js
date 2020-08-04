import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { FormGroup } from "@material-ui/core";
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
	submitJobButton: {
		marginTop: theme.spacing(3),
		width: "50%",
		marginLeft: "25%",
	},
}));

export default function AddForm() {
	const classes = useStyles();

	// Storing state of form using hooks
	const [jobTitle, setjobTitle] = useState("");
	const [jobCompany, setjobCompany] = useState("");
	const [jobLink, setjobLink] = useState("");

	// Stores spinner state
	const [formSubmitted, setFormSubmitted] = useState(false);

	const addApplication = async (jobTitle, jobCompany, jobLink) => {
		const token = localStorage.getItem("token");

		let confirm;

		try {
			// Submitting data
			confirm = await fetch("http://localhost:5000/api/application/", {
				method: "POST",
				headers: {
					"auth-token": token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					applicationtitle: jobTitle,
					applicationemployer: jobCompany,
					applicationlink: jobLink,
				}),
			});

			confirm = await confirm.json();

			if (confirm.success) {
				return true;
			} else {
				throw confirm.error;
			}
		} catch (err) {
			// TODO: better error handling
			console.log(`Error POSTing data: ${err}`);
		}
	};

	// Hook used for redirect
	let history = useHistory();

	return (
		<div>
			<Container maxWidth="sm">
				{!formSubmitted ? (
					<FormGroup noValidate autoComplete="off">
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

						<Button
							className={classes.submitJobButton}
							id="addApplication"
							variant="contained"
							color="primary"
							onClick={(e) => {
								setFormSubmitted(true);

								// Sending application to backend
								addApplication(jobTitle, jobCompany, jobLink)
									.then((res) => {
										if (res) {
											// Redirecting to dashboard
											history.push("/dashboard");
										} else {
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
					</FormGroup>
				) : (
					<Spinner />
				)}
			</Container>
		</div>
	);
}
