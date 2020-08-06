import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import DemoDialog from "./DemoDialog";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function AuthlesAppbar({ setEmail, setPassword }) {
	const classes = useStyles();

	// Setting state
	const [isDemoDialog, setIsDemoDialog] = useState(false);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<span role="img" aria-label="briefcase emoji">
							💼
						</span>{" "}
						JobMate
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => {
							setIsDemoDialog(true);
						}}
					>
						Demo Account
					</Button>
				</Toolbar>
			</AppBar>
			{isDemoDialog ? (
				<DemoDialog
					dialogSwitch={setIsDemoDialog}
					setEmail={setEmail}
					setPassword={setPassword}
				/>
			) : (
				""
			)}
		</div>
	);
}
