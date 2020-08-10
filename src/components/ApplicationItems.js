import React, { useState, useEffect, useCallback } from "react";
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

const ApplicationItems = ({
	applicationID,
	reloadItems,
	itemReloadDone,
	setErrorMessage,
	setIsError,
}) => {
	const classes = useStyles();

	// Setting states
	const [isLoading, setIsLoading] = useState(true);
	const [applicationItems, setApplicationItems] = useState([]);

	// Fetch applications from DB and update state
	const fetchApplicationItems = useCallback(async () => {
		const token = localStorage.getItem("token");

		setIsLoading(true);

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
			} else if (items === []) {
				setIsLoading(false);
			} else {
				console.log("error:" + items);

				// setting parent error state
				setErrorMessage("Unable to get items");
				setIsError(true);

				setIsLoading(false);
			}
		} catch (err) {
			// TODO: real handling
			console.log("error:" + err);

			// setting parent error state
			setErrorMessage("Unable to get items");
			setIsError(true);

			setIsLoading(false);
		}
	}, [applicationID, setErrorMessage, setIsError]);

	// getting application items after pageload
	useEffect(() => {
		fetchApplicationItems();

		// If fetch was triggered by a new item, updating item reload in parent
		if (reloadItems) {
			itemReloadDone();
		}
	}, [fetchApplicationItems, reloadItems, itemReloadDone]);

	if (isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	} else if (!isLoading && applicationItems !== []) {
		return (
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
			>
				{applicationItems.map((item) => (
					<Grid item>
						<Card className={classes.itemCard}>
							<CardContent>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									{Moment(item.useDate).format("DD/MM/YYYY")}
								</Typography>
								<Typography gutterBottom variant="h6" component="h2">
									{item.item_title}
								</Typography>
								{/* <Typography className={classes.pos} color="textSecondary">
									TODO: USE FOR RECORD STATE CHANGE WHEN EXISTS
								</Typography> */}
								<Typography variant="body2" component="p">
									{item.item_content}
								</Typography>
							</CardContent>
							<CardActions>
								<Button>Update (NOT YET WORKING)</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		);
	} else {
		return <div></div>;
	}
};

export default ApplicationItems;
