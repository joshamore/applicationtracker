import React from "react";
import Appbar from "../Appbar";
import Container from "@material-ui/core/Container";
import JobCard from "../JobCard";

export class Dashboard extends React.Component {
	render() {
		return (
			<div>
				<Appbar />
				<h1>Welcome to the Dashboard</h1>
				<Container maxWidth="md">
					<JobCard />
					<JobCard />
					<JobCard />
				</Container>
			</div>
		);
	}
}

export default Dashboard;
