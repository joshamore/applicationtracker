import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
	alert: {
		width: "100%",
		marginTop: theme.spacing(2),
		marginBottom: "-10%",
	},
	alertNoMargin: {
		width: "100%",
		marginTop: theme.spacing(2),
	},
}));

const AlertOverride = ({ severity, alertMessage, setAlert, noMargin }) => {
	const classes = useStyles();

	if (noMargin) {
		return (
			<div className={classes.alertNoMargin}>
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
	} else {
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
	}
};

export default AlertOverride;
