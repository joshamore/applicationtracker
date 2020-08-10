import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearLoader from "./LinearLoader";

export default function UpdateApplicationItem({
	itemID,
	applicationID,
	newItemAdded,
	setErrorMessage,
	setIsError,
	curTitle,
	curContent,
}) {
	const [open, setOpen] = useState(false);
	const [isUpdating, setisUpdating] = useState(false);
	const [itemTitle, setItemTitle] = useState(curTitle);
	const [itemContent, setItemContent] = useState(curContent);
	const [itemCreated, setItemCreated] = useState(null);

	// getting application items after pageload
	useEffect(() => {}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setisUpdating(false);
	};

	const createItem = () => {
		// Adding linear loader
		setisUpdating(true);

		// ASYNC function to update item application
		async function updateItem() {
			const token = localStorage.getItem("token");
			// Store for item
			let item;

			try {
				// Add application item
				item = await fetch("http://localhost:5000/api/application/item", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"auth-token": token,
					},
					body: JSON.stringify({
						itemID: itemID,
						applicationID: applicationID,
						itemContent: itemContent,
						itemTitle: itemTitle,
						itemTimestamp: itemCreated,
					}),
				});

				item = await item.json();

				if (item.item_id !== null || item.item_id !== undefined) {
					// Updating parent to trigger reload of items
					newItemAdded();

					// Closing dialog
					setOpen(false);
					setisUpdating(false);
				} else {
					// Printing error
					console.log(`ERROR UPDATING ITEM:${item}`);

					setErrorMessage("Unable to update item 😢");
					setIsError(true);

					// Closing dialog
					setOpen(false);
					setisUpdating(false);
				}
			} catch (err) {
				// Printing error
				console.log(`ERROR updating ITEM:${err}`);

				setErrorMessage("Unable to update item 😢");
				setIsError(true);

				// Closing dialog
				setOpen(false);
				setisUpdating(false);
			}
		}

		// Calling function to update item
		updateItem();
	};

	return (
		<div>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				Edit
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					{isUpdating ? <p>Updating item...</p> : "Edit item"}
				</DialogTitle>

				{isUpdating ? (
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
