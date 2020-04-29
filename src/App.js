import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/routes/Home";
import { Dashboard } from "./components/routes/Dashboard";
import { Add } from "./components/routes/Add";

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route exact path="/Dashboard" component={Dashboard} />
			<Route exact path="/Add" component={Add} />
		</BrowserRouter>
	);
}

export default App;
