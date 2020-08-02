import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import LinearLoader from "../LinearLoader";
import Appbar from "../Appbar";
import EditDialogue from "../JobEditDialogue";

export default function Job() {
	// Creating state of loading job
	const [loadingJob, setloadingJob] = useState(true);

	// Creating job states
	const [jobTitle, setjobTitle] = useState("");
	const [jobCompany, setjobCompany] = useState("");
	const [jobLink, setjobLink] = useState("");

	function jobUpdate(updatedJob) {
		const { jobTitle, jobCompany, jobLink } = updatedJob;

		setjobTitle(jobTitle);
		setjobCompany(jobCompany);
		setjobLink(jobLink);

		//TODO: Need to update DB entry when DB exists.
	}

	useEffect(() => {
		// Note: faking an API call with settimeout
		setTimeout(() => {
			setjobTitle("COBAL Engineer");
			setjobCompany("Old Co. MEMETIC");
			setjobLink("https://example.com/OLD");
			setloadingJob(false);
		}, 3000);
	});

	return (
		<div>
			<Appbar />
			{loadingJob ? (
				<LinearLoader />
			) : (
				<Container maxWidth={false}>
					<h1>{jobTitle}</h1>
					<h2>{jobCompany}</h2>
					<a href={jobLink}>Job Ad</a>

					<EditDialogue jobUpdate={jobUpdate} />
				</Container>
			)}
		</div>
	);
}

/*********
 * BELOW IS OLD WORK -- REFACTORING INTO HOOK
 */

// export class Job extends React.Component {
// 	state = {
// 		loadingJob: true,
// 	};

// 	jobUpdate = (updatedJob) => {
// 		const { jobTitle, jobCompany, jobLink } = updatedJob;
// 		this.setState({
// 			jobTitle: jobTitle,
// 			jobCompany: jobCompany,
// 			jobLink: jobLink,
// 		});

// 		//TODO: Need to update DB entry when DB exists.
// 	};

// 	componentDidMount() {
// 		// Note: faking an API call with settimeout
// 		setTimeout(() => {
// 			this.setState({
// 				jobTitle: "COBAL Engineer",
// 				jobCompany: "Old Co.",
// 				jobLink: "https://example.com/OLD",
// 				loadingJob: false,
// 			});
// 		}, 3000);
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<Appbar />
// 				{this.state.loadingJob ? (
// 					<LinearLoader />
// 				) : (
// 					<Container maxWidth={false}>
// 						<h1>{this.state.jobTitle}</h1>
// 						<h2>{this.state.jobCompany}</h2>
// 						<a href={this.state.jobLink}>Job Ad</a>

// 						<EditDialogue jobUpdate={this.jobUpdate} />
// 					</Container>
// 				)}
// 			</div>
// 		);
// 	}
// }

// export default Job;
