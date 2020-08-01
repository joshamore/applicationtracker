import React from "react";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Appbar from "../Appbar";
import JobCard from "../JobCard";
import Spinner from "../Spinner";

export class Dashboard extends React.Component {
	state = {
		gettingJobs: true,
		jobApplications: [],
	};

	async componentDidMount() {
		// Store for applications
		let applications;
		let formattedApplications = [];

		try {
			// Getting applications
			applications = await fetch("http://localhosdt:5000/api/application/all");
			applications = await applications.json();

			applications.forEach((application) => {
				formattedApplications.push({
					id: application.app_id,
					jobTitle: application.app_title,
					company: application.app_employer,
					link: application.app_link,
				});
			});

			this.setState({
				jobApplications: formattedApplications,
				gettingJobs: false,
			});
		} catch (err) {
			console.log(err);
			this.setState({ gettingJobs: false });
		}

		// Note: faking an API call with settimeout
		// setTimeout(() => {
		// 	this.setState({
		// 		jobApplications: [
		// 			{
		// 				id: 1,
		// 				jobTitle: "JS Engineer",
		// 				company: "ABC Startup",
		// 				link: "https://example.com",
		// 			},
		// 			{
		// 				id: 2,
		// 				jobTitle: "FrontEnd Engineer",
		// 				company: "ABC Corp.",
		// 				link: "https://example.com",
		// 			},
		// 			{
		// 				id: 33,
		// 				jobTitle: "Rails Dev",
		// 				company: "XYZ Startup",
		// 				link: "https://example.com",
		// 			},
		// 			{
		// 				id: 78,
		// 				jobTitle: "COBAL Engineer",
		// 				company: "1944 Company",
		// 				link: "https://example.com",
		// 			},
		// 		],
		// 		gettingJobs: false,
		// 	});
		// }, 3000);
	}

	render() {
		return (
			<div>
				<Appbar />
				<Container maxWidth={false}>
					<h1>Job Applications</h1>
					{this.state.gettingJobs ? (
						<Spinner />
					) : (
						<Grid container>
							{this.state.jobApplications.map((application) => (
								<Grid item xs={12} sm={6} md={3}>
									<JobCard
										jobTitle={application.jobTitle}
										company={application.company}
										id={application.id}
									/>
								</Grid>
							))}
						</Grid>
					)}
				</Container>
			</div>
		);
	}
}

export default Dashboard;
