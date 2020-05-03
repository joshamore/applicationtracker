import React from "react";
import Container from "@material-ui/core/Container";
import Appbar from "../Appbar";
import AddForm from "../AddForm";

export class Add extends React.Component {
	// Sends application data to server. Returns a promise boolean with true if successful or false if failed.
	// TODO: create backend route
	addApplication = (jobApplication) => {
		const { jobTitle, jobCompany, jobLink } = jobApplication;
		console.log(
			`Applied for ${jobTitle} position with ${jobCompany}. Link to ad: ${jobLink}`
		);

		// Promise with timout used to mimick API call
		// TODO: remove after backend created.
		return new Promise((res, rej) => {
			setTimeout(() => {
				res(true);
			}, 1000);
		});
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
