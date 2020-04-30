import React from "react";
import Appbar from "../Appbar";

export class Dashboard extends React.Component {
	render() {
		return (
			<div>
				<Appbar />
				<h1>Welcome to the Dashboard</h1>
			</div>
		);
	}
}

export default Dashboard;
