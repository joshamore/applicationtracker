import React from "react";
import Container from "@material-ui/core/Container";
import Appbar from "../Appbar";
import AddForm from "../AddForm";

export class Add extends React.Component {
	// Sends application data to server
	// TODO: create backend route
	addApplication = (jobApplication) => {
		const { jobTitle, jobCompany, jobLink } = jobApplication;
		console.log(
			`Applied for ${jobTitle} position with ${jobCompany}. Link to ad: ${jobLink}`
		);
	};

	render() {
		return (
			<div>
				<Appbar />
				<Container maxWidth={false}>
					<h1>Add Job Application</h1>
					<p>This is where you will add your job applications for tracking.</p>
					<AddForm addApplication={this.addApplication} />
				</Container>
			</div>
		);
	}
}

export default Add;
