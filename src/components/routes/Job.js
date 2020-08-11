import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import LinearLoader from "../LinearLoader";
import Appbar from "../Appbar";
import JobEditDialogue from "../JobEditDialogue";
import ApplicationItems from "../ApplicationItems";
import AddApplicationItem from "../AddApplicationItem";
import Alert from "../Alert";
import DeleteJob from "../DeleteJob";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	jobPaper: {
		marginTop: "5%",
		textAlign: "center",
	},
	jobEdit: {
		marginTop: "5%",
		marginBottom: "5%",
	},
});

export default function Job() {
	const classes = useStyles();

	// Setting locaion to receive props
	const location = useLocation();

	// Creating state of loading job
	const [loadingJob, setloadingJob] = useState(true);

	// Creating job states
	const [jobTitle, setjobTitle] = useState("");
	const [jobCompany, setjobCompany] = useState("");
	const [jobLink, setjobLink] = useState("");
	const [jobID] = useState(location.id);

	// Creating error state
	const [bad, setbad] = useState(false);
	const [badMessage, setbadMessage] = useState("");

	// Error states
	// TODO: WTF is going on with bad? Prob refactorable into this
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// State to track item reload requirement for ApplicationItems
	const [reloadItems, setReloadItems] = useState(false);

	// Callback for AddApplicationItem after a new item has been added
	const newItemAdded = () => {
		setReloadItems(true);
	};
	// Callback for ApplicationItems after reloading new items
	const itemReloadDone = () => {
		setReloadItems(false);
	};

	// Update job state if changes have been made
	async function jobUpdate(updatedJob) {
		// Setting loading job to true while updating
		setloadingJob(true);

		let confirm;
		const token = localStorage.getItem("token");

		try {
			// Submitting update
			confirm = await fetch("http://localhost:5000/api/application/", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"auth-token": token,
				},
				body: JSON.stringify({
					id: jobID,
					applicationtitle: updatedJob.jobTitle,
					applicationemployer: updatedJob.jobCompany,
					applicationlink: updatedJob.jobLink,
				}),
			});

			confirm = await confirm.json();

			if (confirm.app_id === jobID) {
				// If update successful, updating state and rendering changes
				setjobTitle(updatedJob.jobTitle);
				setjobCompany(updatedJob.jobCompany);
				setjobLink(updatedJob.jobLink);

				setloadingJob(false);

				return jobID;
			} else {
				// If errors present, throwing to catch
				throw confirm.error;
			}
		} catch (err) {
			// TODO: better error handling
			console.log(`Error POSTing data: ${err}`);

			setbad(true);
			setbadMessage("Error updating job 😢");

			return "failed";
		}
	}

	// getting job after pageload
	useEffect(() => {
		// Validating that a job ID was provided
		if (jobID === null || jobID === undefined) {
			setbad(true);
			setbadMessage("No job to show.");
		} else {
			// ASYNC function to get application
			async function fetchApplication() {
				const token = localStorage.getItem("token");
				// Store for application
				let application;

				try {
					// Getting application
					application = await fetch(
						`http://localhost:5000/api/application/?id=${jobID}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								"auth-token": token,
							},
						}
					);
					application = await application.json();

					if (application.success) {
						setjobTitle(application.app_title);
						setjobCompany(application.app_employer);
						setjobLink(application.app_link);
						setloadingJob(false);
					} else {
						setbad(true);
						setbadMessage(`Unable to get job: ${application.error}`);
					}
				} catch (err) {
					setbad(true);
					setbadMessage(`Unable to get job: ${err}`);
				}
			}

			fetchApplication();
		}
	}, [jobID]);

	// Rendering UI spinner while application getting fetched
	if (loadingJob && !bad) {
		return (
			<div>
				<Appbar />
				<LinearLoader />
			</div>
		);
	}
	// Rendering job if received
	else if (!loadingJob && !bad) {
		return (
			<div>
				<Appbar />
				{isError ? (
					<Container maxWidth="xs">
						<Alert
							severity="error"
							alertMessage={errorMessage}
							setAlert={setIsError}
							noMargin={true}
						/>
					</Container>
				) : (
					""
				)}

				<Grid container justify="center">
					<Grid item xs={9} sm={6}>
						<Paper variant="outlined" className={classes.jobPaper}>
							<h1>Application</h1>
							<p>
								<strong>Job Title:</strong> {jobTitle}
							</p>
							<p>
								<strong>Company:</strong> {jobCompany}
							</p>
							{jobLink !== null ? <a href={jobLink}>Job Posting</a> : ""}
							<Grid container justify="center" className={classes.jobEdit}>
								<JobEditDialogue
									jobUpdate={jobUpdate}
									old_jobTitle={jobTitle}
									old_jobCompany={jobCompany}
									old_jobLink={jobLink}
								/>

								<AddApplicationItem
									applicationID={jobID}
									newItemAdded={newItemAdded}
									setIsError={setIsError}
									setErrorMessage={setErrorMessage}
								/>

								<DeleteJob applicationID={jobID} />
							</Grid>
						</Paper>
					</Grid>
				</Grid>

				<div>
					<ApplicationItems
						applicationID={jobID}
						reloadItems={reloadItems}
						itemReloadDone={itemReloadDone}
						setIsError={setIsError}
						setErrorMessage={setErrorMessage}
						newItemAdded={newItemAdded}
					/>
				</div>
			</div>
		);
	}
	// Rendering error if job failed to get
	else if (bad) {
		return (
			<div>
				<Appbar />
				<Container maxWidth={false}>
					<h1>{badMessage}</h1>
				</Container>
			</div>
		);
	}
}

/*********
 * BELOW IS OLD WORK -- REFACTORING INTO HOOK
 */

// export class Job extends React.Component {
// 	state = {
// 		loadingJob: true,
// 	};

// 	jobUpdate = (updatedJob) => {
// 		const { jobTitle, jobCompany, jobLink } = updatedJob;
// 		this.setState({
// 			jobTitle: jobTitle,
// 			jobCompany: jobCompany,
// 			jobLink: jobLink,
// 		});

// 		//TODO: Need to update DB entry when DB exists.
// 	};

// 	componentDidMount() {
// 		// Note: faking an API call with settimeout
// 		setTimeout(() => {
// 			this.setState({
// 				jobTitle: "COBAL Engineer",
// 				jobCompany: "Old Co.",
// 				jobLink: "https://example.com/OLD",
// 				loadingJob: false,
// 			});
// 		}, 3000);
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<Appbar />
// 				{this.state.loadingJob ? (
// 					<LinearLoader />
// 				) : (
// 					<Container maxWidth={false}>
// 						<h1>{this.state.jobTitle}</h1>
// 						<h2>{this.state.jobCompany}</h2>
// 						<a href={this.state.jobLink}>Job Ad</a>

// 						<EditDialogue jobUpdate={this.jobUpdate} />
// 					</Container>
// 				)}
// 			</div>
// 		);
// 	}
// }

// export default Job;
