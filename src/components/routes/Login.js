import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Spinner from "../common/Spinner";
import { useHistory, useLocation } from "react-router-dom";
import Alert from "../common/Alert";

import AuthlessAppbar from "./../AuthlessAppbar";

import Auth from "../../helpers/Auth";

// Inspired by: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	spinnerSpace: {
		marginTop: theme.spacing(2),
	},
	alert: {
		width: "100%",
		marginTop: theme.spacing(2),
		marginBottom: "-10%",
	},
}));

export default function Login() {
	// Required hooks
	const history = useHistory();
	const classes = useStyles();
	const location = useLocation();

	// Creating state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isAlert, setIsAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	// Setting isLoading after pageload
	useEffect(() => {
		setIsLoading(false);

		// Redirecting user to home route if already auth
		Auth.isAuth().then((res) => {
			if (res) {
				history.push("/");
			}
		});

		// Pinging backend to warmup instance
		fetch("https://amorejobmate.herokuapp.com/api/ping")
			.then((ping) => {
				console.log("Warm backend");
			})
			.catch((e) => console.log("Not warm"));

		// Setting account creation alert state if needed
		if (location.fromRegister !== undefined && location.fromRegister) {
			setAlertMessage("Account creation successful! Please log in below 👇");
			setAlertSeverity("success");
			setIsAlert(true);
		}
	}, [history, location]);

	// Validating the login form
	const validateLoginForm = () => {
		// Validating input
		if (!email.includes("@")) {
			setAlertMessage("🙅 Email address must be valid ");
			setAlertSeverity("error");
			setIsAlert(true);

			return false;
		}
		if (password.length <= 8) {
			setAlertMessage("🙅 Password must be at least 9 characters");
			setAlertSeverity("error");
			setIsAlert(true);

			return false;
		}

		return true;
	};

	const attemptLogin = async (email, password) => {
		try {
			// Attempting login
			let loginConfirm = await fetch(
				"https://amorejobmate.herokuapp.com/auth/login/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				}
			);

			// Adding JSON buffer to JS Object
			loginConfirm = await loginConfirm.json();

			// Setting local storage
			localStorage.setItem("token", loginConfirm.token);

			// Checking validaion and returning results
			return await Auth.isAuth();
		} catch (err) {
			console.log(`ERROR WITH LOGIN: ${err}`);

			return false;
		}
	};

	// Default render
	if (!isLoading) {
		return (
			<div>
				<AuthlessAppbar setEmail={setEmail} setPassword={setPassword} />
				<Container component="main" maxWidth="xs">
					{isAlert ? (
						<Alert
							severity={alertSeverity}
							alertMessage={alertMessage}
							setAlert={setIsAlert}
						/>
					) : (
						<div></div>
					)}
					<CssBaseline />
					<div className={classes.paper}>
						<Typography component="h2" variant="h5">
							Log In
						</Typography>
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={email}
								autoComplete="email"
								autoFocus
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={password}
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={(e) => {
									// Attempting to login if validation of form passes
									if (validateLoginForm()) {
										// Setting loading spinner
										setIsLoading(true);

										attemptLogin(email, password)
											.then((res) => {
												setIsLoading(false);

												// If login successful, redirecting to home
												if (res) {
													console.log("login successful");
													history.push("/");
												} else {
													setAlertMessage(
														"😥 Error logging in. Are your email and password correct?"
													);
													setAlertSeverity("error");
													setIsAlert(true);

													// LOGGIN ERROR
													console.log(res);
												}
											})
											.catch((err) => {
												// If error, stopping spinner and displaying error.
												setIsLoading(false);

												setAlertMessage("😥 Error logging in");
												setAlertSeverity("error");
												setIsAlert(true);

												// LOGGIN ERROR
												console.log(err);
											});
									}
								}}
							>
								Log In
							</Button>
							<Grid container>
								<Grid item>
									<Link href="/register" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			</div>
		);
	}

	// Render if login
	if (isLoading) {
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h2" variant="h5">
						Logging In
					</Typography>
				</div>
				<div className={classes.spinnerSpace}></div>
				<Spinner />
			</Container>
		);
	}
}
