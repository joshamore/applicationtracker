import React from "react";
import { Link } from "react-router-dom";
import Appbar from "../Appbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListIcon from "@material-ui/icons/List";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		textAlign: "center",
	},
	headerSpace: {
		marginTop: "0.5em",
	},
});

export default function Home() {
	const classes = useStyles();

	return (
		<div>
			<Appbar />
			<div className={classes.root}>
				<Container maxWidth="sm">
					<Typography
						gutterBottom={true}
						variant="h4"
						component="h1"
						align="center"
						className={classes.headerSpace}
					>
						Job Applications
					</Typography>
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
		</div>
	);
}
