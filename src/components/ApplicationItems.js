import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Paper from "@material-ui/core/Paper";

const ApplicationItems = ({ applicationID }) => {
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

				// ISSUE HERE OR WITH MAP (ALSO CHECK BACKEND)
				if (items !== null) {
					setApplicationItems(items);
					console.log(applicationItems);
					// setIsLoading(false);
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
	}, []);

	if (isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	} else {
		return (
			<div>
				{applicationItems.map((application) => (
					<Paper>
						<p>{application.item_content}</p>
					</Paper>
				))}
			</div>
		);
	}
};

export default ApplicationItems;
