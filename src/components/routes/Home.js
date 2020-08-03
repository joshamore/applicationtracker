import React from "react";
import { Link } from "react-router-dom";
import Appbar from "../Appbar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListIcon from "@material-ui/icons/List";

export default function Home() {
	return (
		<div>
			<Appbar />
			<Container maxWidth="sm">
				<h1>Application Tracker</h1>
				<p>Track your job application history and progress.</p>
			</Container>
			<Container maxWidth="sm">
				<ButtonGroup color="primary" aria-label="large button group">
					<Button component={Link} to="/add">
						<AddCircleOutlineIcon /> Add Job
					</Button>
					<Button component={Link} to="/dashboard">
						<ListIcon /> Applied Jobs
					</Button>
				</ButtonGroup>
			</Container>
		</div>
	);
}
