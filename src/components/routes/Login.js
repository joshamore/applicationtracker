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
import Spinner from "../Spinner";
import { useHistory } from "react-router-dom";

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
}));

export default function Login() {
	const history = useHistory();
	const classes = useStyles();

	// Storing state of form elements
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	// Setting isLoading after pageload
	useEffect(() => {
		setIsLoading(false);
	}, []);

	const attemptLogin = async (email, password) => {
		// TODO: input validation and throw an alert

		try {
			// Attempting login
			let loginConfirm = await fetch("http://localhost:5000/auth/login/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});

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
			<Container component="main" maxWidth="xs">
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
							autoComplete="email"
							autoFocus
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
								// Setting loading spinner
								setIsLoading(true);

								attemptLogin(email, password)
									.then((res) => {
										setIsLoading(false);

										// If login successful, redirecting to home
										if (res) {
											console.log("login successful");
											history.push("/");
										}
									})
									.catch((err) => {
										// TODO: should display an error alert if there's an error.
										setIsLoading(false);
									});
							}}
						>
							Log In
						</Button>
						<Grid container>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
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
						Logging In
					</Typography>
				</div>
				<div className={classes.spinnerSpace}></div>
				<Spinner />
			</Container>
		);
	}
}
