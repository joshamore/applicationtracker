import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearLoader from "./common/LinearLoader";

export default function AddApplicationItem({
	applicationID,
	newItemAdded,
	setErrorMessage,
	setIsError,
}) {
	const [open, setOpen] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [itemTitle, setItemTitle] = useState("");
	const [itemContent, setItemContent] = useState("");
	const [itemCreated, setItemCreated] = useState("");

	// getting application items after pageload
	useEffect(() => {
		// TODO
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setIsCreating(false);
	};

	const createItem = () => {
		// Adding linear loader
		setIsCreating(true);

		// ASYNC function to get application
		async function addItem() {
			const token = localStorage.getItem("token");
			// Store for item
			let item;

			try {
				// Add application item
				item = await fetch(
					"https://amorejobmate.herokuapp.com/api/application/item",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"auth-token": token,
						},
						body: JSON.stringify({
							applicationID: applicationID,
							itemContent: itemContent,
							itemTitle: itemTitle,
							itemTimestamp: itemCreated,
						}),
					}
				);

				item = await item.json();

				if (item.item_id !== null || item.item_id !== undefined) {
					// Updating parent to trigger reload of items
					newItemAdded();

					// Closing dialog
					setOpen(false);
					setIsCreating(false);

					// Wiping out state values after update
					setItemTitle("");
					setItemContent("");
					setItemCreated("");
				} else {
					// Printing error
					console.log(`ERROR ADDING ITEM:${item}`);

					setErrorMessage("Unable to add item 😢");
					setIsError(true);

					// Closing dialog
					setOpen(false);
					setIsCreating(false);
				}
			} catch (err) {
				// Printing error
				console.log(`ERROR ADDING ITEM:${err}`);

				setErrorMessage("Unable to add item 😢");
				setIsError(true);

				// Closing dialog
				setOpen(false);
				setIsCreating(false);
			}
		}

		addItem();
	};

	return (
		<div>
			<Button variant="contained" onClick={handleClickOpen}>
				Add Item
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					{isCreating ? <p>Creating item...</p> : "Create a new item"}
				</DialogTitle>

				{isCreating ? (
					<div>
						<LinearLoader />
					</div>
				) : (
					<div>
						<DialogContent>
							<DialogContentText>
								Items are updates related to the job application (e.g a
								phonecall with the company, a progress email, etc).
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="itemTitle"
								label="Item Title"
								type="text"
								value={itemTitle}
								onChange={(e) => setItemTitle(e.target.value)}
								fullWidth
							/>
							<TextField
								margin="dense"
								id="itemContent"
								label="Item Details"
								type="text"
								value={itemContent}
								onChange={(e) => setItemContent(e.target.value)}
								fullWidth
							/>
							<TextField
								margin="dense"
								id="itemCreated"
								label="Item Date"
								type="date"
								value={itemCreated}
								onChange={(e) => setItemCreated(e.target.value)}
								fullWidth
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={createItem} color="primary">
								Create
							</Button>
						</DialogActions>
					</div>
				)}
			</Dialog>
		</div>
	);
}
