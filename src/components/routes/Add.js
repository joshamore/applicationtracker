import React from "react";
import Appbar from "../Appbar";

export class Add extends React.Component {
	render() {
		return (
			<div>
				<Appbar />
				<h1>Add Job Application</h1>
				<p>This is where you will add your job applications for tracking.</p>
			</div>
		);
	}
}

export default Add;
