import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Moment from "moment";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import UpdateApplicationItem from "./UpdateApplicationItem";
import Typography from "@material-ui/core/Typography";
import DeleteItem from "./DeleteItem";
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

const Item = ({ itemData, setErrorMessage, setIsError, newItemAdded }) => {
	const classes = useStyles();

	// Setting item state
	const [itemTitle] = useState(itemData.item_title);
	const [itemContent] = useState(itemData.item_content);
	const [itemTimestamp] = useState(itemData.useDate);
	const [itemID] = useState(itemData.item_id);
	const [appID] = useState(itemData.item_application);

	return (
		<div>
			<Card className={classes.itemCard} id={itemID}>
				<CardContent>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						{Moment(itemTimestamp).format("DD/MM/YYYY")}
					</Typography>
					<Typography gutterBottom variant="h6" component="h2">
						{itemTitle}
					</Typography>
					{/* <Typography className={classes.pos} color="textSecondary">
									TODO: USE FOR RECORD STATE CHANGE WHEN EXISTS
								</Typography> */}
					<Typography variant="body2" component="p">
						{itemContent}
					</Typography>
				</CardContent>
				<CardActions>
					<UpdateApplicationItem
						itemID={itemID}
						applicationID={appID}
						curTitle={itemTitle}
						curContent={itemContent}
						setErrorMessage={setErrorMessage}
						setIsError={setIsError}
						newItemAdded={newItemAdded}
					/>
					<DeleteItem
						itemID={itemID}
						setErrorMessage={setErrorMessage}
						setIsError={setIsError}
						newItemAdded={newItemAdded}
					/>
				</CardActions>
			</Card>
		</div>
	);
};

export default Item;
