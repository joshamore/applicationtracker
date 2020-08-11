import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Grid, Typography } from "@material-ui/core";
import Appbar from "../Appbar";
import JobCard from "../JobCard";
import Spinner from "../Spinner";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	centerGrid: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		justify: "center",
		spacing: 0,
	},
	headerSpace: {
		marginTop: "0.5em",
	},
});

export default function Dashboard() {
	const classes = useStyles();

	// Creating state
	const [gettingJobs, setgettingJobs] = useState(true);
	const [jobApplications, setjobApplications] = useState([]);
	const [errorGettingApplications, seterrorGettingApplications] = useState(
		false
	);

	useEffect(() => {
		// Using a function here as useEffect doesn't like async
		// This should be resolved in a future react update (suspense): https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret

		// Function to get applications
		async function fetchData() {
			// Store for applications
			let applications;
			let formattedApplications = [];

			// Getting token
			const token = localStorage.getItem("token");

			try {
				// Getting applications
				applications = await fetch(
					"https://amorejobmate.herokuapp.com/api/application/all",
					{
						method: "GET",
						headers: {
							"auth-token": token,
							"Content-Type": "application/json",
						},
					}
				);
				applications = await applications.json();

				// Formatting applications before adding to state
				applications.forEach((application) => {
					formattedApplications.push({
						id: application.app_id,
						jobTitle: application.app_title,
						company: application.app_employer,
						link: application.app_link,
					});
				});

				// Adding formatted applicationst to state
				setjobApplications(formattedApplications);
				setgettingJobs(false);
			} catch (err) {
				console.log(err);
				setgettingJobs(false);
				seterrorGettingApplications(true);
			}
		}

		// Getting applications
		fetchData();
	}, []);

	// Returning render with spinner while awaiting applications
	if (gettingJobs && !errorGettingApplications) {
		return (
			<div>
				<Appbar />
				<Container maxWidth={false}>
					<Typography
						gutterBottom={true}
						variant="h4"
						component="h1"
						align="center"
						className={classes.headerSpace}
					>
						Job Applications
					</Typography>
					<Spinner />
				</Container>
			</div>
		);
	}
	// Returning render of applications if they were succesfully received
	else if (!gettingJobs && !errorGettingApplications) {
		return (
			<div>
				<Appbar />
				<Container maxWidth={false}>
					<Typography
						gutterBottom={true}
						variant="h4"
						component="h1"
						align="center"
						className={classes.headerSpace}
					>
						Job Applications
					</Typography>
					<Grid container>
						{jobApplications.map((application) => (
							<Grid
								className={classes.centerGrid}
								item
								xs={12}
								sm={6}
								md={4}
								lg={3}
							>
								<JobCard
									jobTitle={application.jobTitle}
									company={application.company}
									id={application.id}
								/>
							</Grid>
						))}
					</Grid>
				</Container>
			</div>
		);
	}
	// Returnig error message if unable to get applications
	// TODO: add a nicer error message
	else {
		return (
			<div>
				<Appbar />
				<Container maxWidth={false}>
					<h1>Job Applications</h1>
					<p>Unable to get job applications :(</p>
				</Container>
			</div>
		);
	}
}
