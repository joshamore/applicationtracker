import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		width: 230,
		margin: 10,
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function JobCard(props) {
	const classes = useStyles();
	const history = useHistory();

	const { jobTitle, company, id } = props;

	// Redirect to job page
	// TODO: Will need to take ID when backend exists
	const toJob = () => history.push("/job");

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Application
				</Typography>
				<Typography variant="h5" component="h2">
					{jobTitle}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{company}
				</Typography>
			</CardContent>
			<CardActions>
				{/* TODO: The redirect will route to the specific job when backend up */}

				<Button
					size="small"
					color="primary"
					variant="contained"
					onClick={toJob}
				>
					Add Update
				</Button>
			</CardActions>
		</Card>
	);
}
