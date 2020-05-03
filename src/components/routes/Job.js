import React from "react";
import Container from "@material-ui/core/Container";
import LinearLoader from "../LinearLoader";
import Appbar from "../Appbar";

export class Job extends React.Component {
	state = {
		loadingJob: true,
	};

	componentDidMount() {
		// Note: faking an API call with settimeout
		setTimeout(() => {
			this.setState({
				jobTitle: "COBAL Engineer",
				jobCompany: "Old Co.",
				jobLink: "https://example.com/OLD",
				loading: false,
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
					</Container>
				)}
			</div>
		);
	}
}

export default Job;
