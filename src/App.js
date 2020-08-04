import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/routes/Home";
import Dashboard from "./components/routes/Dashboard";
import Add from "./components/routes/Add";
import Job from "./components/routes/Job";
import Login from "./components/routes/Login";
import { ProtectedRoute } from "./helpers/ProtectedRoute";

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/login" component={Login} />
			<Route exact path="/" component={Home} />

			<ProtectedRoute exact path="/Dashboard" component={Dashboard} />

			<Route exact path="/Job" component={Job} />
			<Route exact path="/Add" component={Add} />
		</BrowserRouter>
	);
}

export default App;
