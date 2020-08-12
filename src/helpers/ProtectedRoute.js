import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import Auth from "./Auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const [authLoading, setAuthLoading] = useState(true);
	const [auth, setAuth] = useState(false);

	// Checking auth after pagelaod
	useEffect(() => {
		Auth.isAuth().then((res) => {
			if (res) {
				setAuth(true);
				setAuthLoading(false);
			} else {
				setAuth(false);
				setAuthLoading(false);
			}
		});
	}, []);

	// Render if checking auth
	if (authLoading) {
		return <Spinner />;
	}

	// Route if user not authenticated
	if (!authLoading && !auth) {
		return (
			<Redirect
				to={{
					pathname: "/login",
				}}
			/>
		);
	}

	// Route if user is authenticated
	if (!authLoading && auth) {
		return (
			<Route
				{...rest}
				render={(props) => {
					return <Component {...props} />;
				}}
			/>
		);
	}
};
