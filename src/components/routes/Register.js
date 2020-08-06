import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Spinner from "../Spinner";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
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

export default function Register() {
	const history = useHistory();
	const classes = useStyles();

	// Error state
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// Storing state of form elements
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	// Loading state
	const [isLoading, setIsLoading] = useState(false);

	// Setting isLoading after pageload
	useEffect(() => {
		setIsLoading(false);

		// If user is authorised, taking to home route
		Auth.isAuth().then((res) => {
			if (res) {
				history.push("/");
			}
		});
	}, [history]);

	// Validating entered form fields
	const validateFormData = () => {
		if (firstName === "") {
			setErrorMessage("Please enter your first name");
			setIsError(true);

			return false;
		}
		if (lastName === "") {
			setErrorMessage("Please enter your last name");
			setIsError(true);

			return false;
		}
		if (email === "") {
			setErrorMessage("Please enter your email address");
			setIsError(true);

			return false;
		}
		if (!email.includes("@")) {
			setErrorMessage("Please enter a valid email address");
			setIsError(true);

			return false;
		}
		// Setting error if entered passwords don't match
		if (password !== passwordConfirm) {
			setErrorMessage("Passwords must match");
			setIsError(true);

			return false;
		}
		// Ensuring a password has been entered
		if (password === "") {
			setErrorMessage("Please enter a password");
			setIsError(true);

			return false;
		}
		// Checking password length
		if (password.length <= 8) {
			setErrorMessage("Passwords must be at least 9 characters");
			setIsError(true);

			return false;
		}

		// returning true if validating successful
		return true;
	};

	// Attempting to register account with provided details
	const attemptRegister = async (email, password, firstName, lastName) => {
		// Attempting to register account with provided details
		try {
			// Attempting login
			let registerConfirm = await fetch(
				"http://Jobmate-env-1.eba-hpgje7mm.us-east-1.elasticbeanstalk.com/auth/register/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
						firstname: firstName,
						lastname: lastName,
					}),
				}
			);

			// Adding JSON buffer to JS Object
			registerConfirm = await registerConfirm.json();

			// Returning true if successful otherwise false
			if (registerConfirm.success) {
				return true;
			} else {
				console.log(`ERROR WITH REGISTER: ${registerConfirm.error}`);

				return false;
			}
		} catch (err) {
			console.log(`ERROR WITH REGISTER: ${err}`);

			return false;
		}
	};

	// Default render
	if (!isLoading) {
		return (
			<Container component="main" maxWidth="xs">
				{isError ? (
					<div className={classes.alert}>
						<Alert
							severity="error"
							onClose={() => {
								setIsError(false);
								setErrorMessage("");
							}}
						>
							{errorMessage}
						</Alert>
					</div>
				) : (
					<div></div>
				)}

				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h2" variant="h5">
						Create New Account
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="firstName"
							label="First Name"
							name="firstName"
							autoComplete="firstName"
							autoFocus
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="lastName"
							label="Last Name"
							name="lastName"
							autoComplete="firstName"
							onChange={(e) => setLastName(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="passwordConfirm"
							label="Confirm Password"
							type="password"
							id="passwordConfirm"
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={(e) => {
								if (validateFormData()) {
									setIsLoading(true);
									attemptRegister(email, password, firstName, lastName)
										.then((confirm) => {
											if (confirm) {
												setIsLoading(false);

												// Redirecting to login
												history.push({
													pathname: "/login",
													fromRegister: true,
												});
											} else {
												setIsLoading(false);
												setErrorMessage("Issue when creating your account 😢");
												setIsError(true);
											}
										})
										.catch((err) => {
											setIsLoading(false);
											setErrorMessage("Issue when creating your account 😢");
											setIsError(true);
										});
								} else {
									setIsLoading(false);

									console.log("issue with input");
								}
							}}
						>
							Register
						</Button>
						<Grid container>
							<Grid item>
								<Link href="/login" variant="body2">
									{"Already have an account? Log in"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}

	// Render if login
	if (isLoading) {
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h2" variant="h5">
						Registering
					</Typography>
				</div>
				<div className={classes.spinnerSpace}></div>
				<Spinner />
			</Container>
		);
	}
}
