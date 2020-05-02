import React from "react";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Appbar from "../Appbar";
import JobCard from "../JobCard";

export class Dashboard extends React.Component {
	state = {
		gettingJobs: true,
		jobApplications: [],
	};

	componentDidMount() {
		// Note: faking an API call with settimeout
		setTimeout(() => {
			this.setState({
				jobApplications: [
					{
						id: 1,
						jobTitle: "JS Engineer",
						company: "ABC Startup",
					},
					{
						id: 2,
						jobTitle: "FrontEnd Engineer",
						company: "ABC Corp.",
					},
					{
						id: 33,
						jobTitle: "Rails Dev",
						company: "XYZ Startup",
					},
					{
						id: 78,
						jobTitle: "COBAL Engineer",
						company: "1944 Company",
					},
				],
				gettingJobs: false,
			});
		}, 3000);
	}

	render() {
		return (
			<div>
				<Appbar />
				<Container maxWidth={false}>
					<h1>Welcome to the Dashboard</h1>
					{this.state.gettingJobs ? (
						<p>Loading....</p>
					) : (
						<Grid container>
							{this.state.jobApplications.map((application) => (
								<Grid item xs={12} sm={6} md={3}>
									<JobCard
										jobTitle={application.jobTitle}
										company={application.company}
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
