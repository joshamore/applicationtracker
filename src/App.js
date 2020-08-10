import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/routes/Home";
import Dashboard from "./components/routes/Dashboard";
import Add from "./components/routes/Add";
import Job from "./components/routes/Job";
import Login from "./components/routes/Login";
import Register from "./components/routes/Register";
import { ProtectedRoute } from "./helpers/ProtectedRoute";
import ReactGA from "react-ga";

function App() {
	// Initialising google analytics
	useEffect(() => {
		ReactGA.initialize("UA-174882746-2");
		ReactGA.pageview(window.location.pathname);
	}, []);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />

				<ProtectedRoute exact path="/Dashboard" component={Dashboard} />
				<ProtectedRoute exact path="/Job" component={Job} />
				<ProtectedRoute exact path="/Add" component={Add} />

				{/* Below is rendering any non-specific routes to home (or login if not auth) */}
				<ProtectedRoute path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
