import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

export default function JobCard() {
	const classes = useStyles();

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
					JOB TITLE #TODO
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					Company Name #TODO
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" color="primary">
					Add Update
				</Button>
			</CardActions>
		</Card>
	);
}
