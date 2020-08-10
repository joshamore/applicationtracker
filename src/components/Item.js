import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Moment from "moment";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	itemCard: {
		minWidth: 275,
		maxWidth: 275,
		marginTop: "3%",
		marginBottom: "3%",
	},

	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

const Item = ({ itemData }) => {
	const classes = useStyles();

	return (
		<div>
			<Card className={classes.itemCard}>
				<CardContent>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						{Moment(itemData.useDate).format("DD/MM/YYYY")}
					</Typography>
					<Typography gutterBottom variant="h6" component="h2">
						{itemData.item_title}
					</Typography>
					{/* <Typography className={classes.pos} color="textSecondary">
									TODO: USE FOR RECORD STATE CHANGE WHEN EXISTS
								</Typography> */}
					<Typography variant="body2" component="p">
						{itemData.item_content}
					</Typography>
				</CardContent>
				<CardActions>
					<Button>Update</Button>
				</CardActions>
			</Card>
		</div>
	);
};

export default Item;
