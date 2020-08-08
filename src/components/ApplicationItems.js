import React, { useState, useEffect } from "react";
import Moment from "moment";
import Spinner from "./Spinner";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// CARD STUFF
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

const ApplicationItems = ({ applicationID }) => {
	const classes = useStyles();

	// Setting state
	const [isLoading, setIsLoading] = useState(true);
	const [applicationItems, setApplicationItems] = useState([]);

	// getting application items after pageload
	useEffect(() => {
		// ASYNC function to get application items
		async function fetchApplicationItems() {
			const token = localStorage.getItem("token");
			// Store for application
			let items;

			try {
				// Getting application
				items = await fetch(
					`http://localhost:5000/api/application/item/all?id=${applicationID}`,
					{
						method: "GET",
						headers: {
							"auth-token": token,
						},
					}
				);
				items = await items.json();

				// TODO: Need real handling (maybe state to confirm if items received.)
				if (items !== null) {
					// Setting useDate of each item
					items.map((item) => {
						if (item.item_timestamp === null) {
							item.useDate = item.item_created_timestamp;
							return item;
						} else {
							item.useDate = item.item_timestamp;
							return item;
						}
					});

					// Setting item state
					setApplicationItems(items);

					setIsLoading(false);
				} else {
					// TODO: real handling
					console.log("error:" + items);
				}
			} catch (err) {
				// TODO: real handling
				console.log("error:" + err);
			}
		}

		fetchApplicationItems();
	}, [applicationID]);

	if (isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	} else {
		return (
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
			>
				{applicationItems.map((application) => (
					<Grid item>
						<Card className={classes.itemCard}>
							<CardContent>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									{Moment(application.useDate).format("DD/MM/YYYY")}
								</Typography>
								<Typography gutterBottom variant="h6" component="h2">
									ITEM HEADING LONG LONG LONG LONG
								</Typography>
								{/* <Typography className={classes.pos} color="textSecondary">
									TODO: USE FOR RECORD STATE CHANGE WHEN EXISTS
								</Typography> */}
								<Typography variant="body2" component="p">
									{application.item_content}
								</Typography>
							</CardContent>
							<CardActions>
								<Button>Update</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		);
	}
};

export default ApplicationItems;
