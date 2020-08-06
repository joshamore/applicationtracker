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
		width: 250,
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
	const toJob = () => {
		history.push({
			pathname: "/job/",
			search: `${id}`,
			id: id,
		});
	};

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
				<Button
					size="small"
					color="primary"
					variant="contained"
					onClick={toJob}
				>
					Open
				</Button>
			</CardActions>
		</Card>
	);
}
