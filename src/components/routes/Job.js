import React from "react";
import Container from "@material-ui/core/Container";
import LinearLoader from "../LinearLoader";
import Appbar from "../Appbar";
import EditDialogue from "../JobEditDialogue";

export class Job extends React.Component {
	state = {
		loadingJob: true,
	};

	jobUpdate = (updatedJob) => {
		const { jobTitle, jobCompany, jobLink } = updatedJob;
		this.setState({
			jobTitle: jobTitle,
			jobCompany: jobCompany,
			jobLink: jobLink,
		});

		//TODO: Need to update DB entry when DB exists.
	};

	componentDidMount() {
		// Note: faking an API call with settimeout
		setTimeout(() => {
			this.setState({
				jobTitle: "COBAL Engineer",
				jobCompany: "Old Co.",
				jobLink: "https://example.com/OLD",
				loadingJob: false,
			});
		}, 3000);
	}

	render() {
		return (
			<div>
				<Appbar />
				{this.state.loadingJob ? (
					<LinearLoader />
				) : (
					<Container maxWidth={false}>
						<h1>{this.state.jobTitle}</h1>
						<h2>{this.state.jobCompany}</h2>
						<a href={this.state.jobLink}>Job Ad</a>

						<EditDialogue jobUpdate={this.jobUpdate} />
					</Container>
				)}
			</div>
		);
	}
}

export default Job;
