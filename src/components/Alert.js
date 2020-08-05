import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
	alert: {
		width: "100%",
		marginTop: theme.spacing(2),
		marginBottom: "-10%",
	},
}));

const AlertOverride = ({ severity, alertMessage, setAlert }) => {
	const classes = useStyles();

	return (
		<div className={classes.alert}>
			<Alert
				severity={severity}
				onClose={() => {
					setAlert(false);
				}}
			>
				{alertMessage}
			</Alert>
		</div>
	);
};

export default AlertOverride;
