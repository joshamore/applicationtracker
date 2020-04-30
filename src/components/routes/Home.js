import React from "react";
import Appbar from "../Appbar";

export class Home extends React.Component {
	render() {
		return (
			<div>
				<Appbar />
				<h1>Welcome Home</h1>
			</div>
		);
	}
}

export default Home;
