import React from "react";
// import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Appbar from "../Appbar";
import JobCard from "../JobCard";

export class Dashboard extends React.Component {
	render() {
		return (
			<div>
				<Appbar />
				<h1>Welcome to the Dashboard</h1>
				<Grid container>
					<Grid item xs={12} sm={6} md={3}>
						<JobCard />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<JobCard />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<JobCard />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<JobCard />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Dashboard;
