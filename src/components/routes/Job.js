import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import LinearLoader from "../LinearLoader";
import Appbar from "../Appbar";
import EditDialogue from "../JobEditDialogue";

export default function Job() {
	// Setting locaion to receive props
	const location = useLocation();

	// Creating state of loading job
	const [loadingJob, setloadingJob] = useState(true);

	// Creating job states
	const [jobTitle, setjobTitle] = useState("");
	const [jobCompany, setjobCompany] = useState("");
	const [jobLink, setjobLink] = useState("");
	const [jobID, setjobID] = useState(location.id);

	// Creating error state
	const [bad, setbad] = useState(false);
	const [badMessage, setbadMessage] = useState("");

	function jobUpdate(updatedJob) {
		const { jobTitle, jobCompany, jobLink } = updatedJob;

		setjobTitle(jobTitle);
		setjobCompany(jobCompany);
		setjobLink(jobLink);

		//TODO: Need to update DB entry when DB exists.
	}

	useEffect(() => {
		// Validating that a job ID was provided
		if (jobID === null || jobID === undefined) {
			setbad(true);
			setbadMessage("No job to show.");
		} else {
			// ASYNC function to get application
			async function fetchApplication() {
				// Store for application
				let application;

				try {
					// Getting application
					application = await fetch(
						`http://localhost:5000/api/application/?id=${jobID}`
					);
					application = await application.json();

					if (application.success) {
						setjobTitle(application.app_title);
						setjobCompany(application.app_employer);
						setjobLink(application.app_link);
						setloadingJob(false);
					} else {
						setbad(true);
						setbadMessage(`Unable to get job: ${application.error}`);
					}
				} catch (err) {
					setbad(true);
					setbadMessage(`Unable to get job: ${err}`);
				}
			}

			fetchApplication();
		}
	}, [jobID]);

	// Rendering UI spinner while application getting fetched
	if (loadingJob && !bad) {
		return (
			<div>
				<Appbar />
				<LinearLoader />
			</div>
		);
	}
	// Rendering job if received
	else if (!loadingJob && !bad) {
		return (
			<div>
				<Appbar />
				<Container maxWidth={false}>
					<h1>{jobTitle}</h1>
					<h2>{jobCompany}</h2>
					<a href={jobLink}>Job Ad</a>

					<EditDialogue jobUpdate={jobUpdate} />
				</Container>
			</div>
		);
	}
	// Rendering error if job failed to get
	else if (bad) {
		return (
			<div>
				<Appbar />
				<Container maxWidth={false}>
					<h1>{badMessage}</h1>
				</Container>
			</div>
		);
	}
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
