import React from "react";
// import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Appbar from "../Appbar";
import JobCard from "../JobCard";

export class Dashboard extends React.Component {
	state = {
		gettingJobs: true,
		jobsApplications: [],
	};

	componentDidMount() {
		// Note: faking an API call with settimeout
		setTimeout(() => {
			this.setState({
				jobsApplications: [
					{
						jobTitle: "JS Engineer",
						company: "ABC Startup",
					},
					{
						jobTitle: "FrontEnd Engineer",
						company: "ABC Corp.",
					},
					{
						jobTitle: "Rails Dev",
						company: "XYZ Startup",
					},
					{
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
				<h1>Welcome to the Dashboard</h1>
				{this.state.gettingJobs ? (
					<p>Loading....</p>
				) : (
					<Grid container>
						<Grid item xs={12} sm={6} md={3}>
							<JobCard
								jobTitle={this.state.jobsApplications[0].jobTitle}
								company={this.state.jobsApplications[0].company}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<JobCard
								jobTitle={this.state.jobsApplications[1].jobTitle}
								company={this.state.jobsApplications[1].company}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<JobCard
								jobTitle={this.state.jobsApplications[2].jobTitle}
								company={this.state.jobsApplications[2].company}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<JobCard
								jobTitle={this.state.jobsApplications[3].jobTitle}
								company={this.state.jobsApplications[3].company}
							/>
						</Grid>
					</Grid>
				)}
			</div>
		);
	}
}

export default Dashboard;
