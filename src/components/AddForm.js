import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));

export default function AddForm() {
	const classes = useStyles();

	return (
		<div>
			<Container maxWidth="md">
				<form className={classes.root} noValidate autoComplete="off">
					<TextField id="jobTitle" label="Job Title" />
					<TextField id="jobCompany" label="Company Name" />
					<TextField id="jobLink" label="Link to Ad" />
				</form>
			</Container>
		</div>
	);
}
