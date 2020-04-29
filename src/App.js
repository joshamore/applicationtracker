import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/routes/Home";
import { Dashboard } from "./components/routes/Dashboard";

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route exact path="/Dashboard" component={Dashboard} />
		</BrowserRouter>
	);
}

export default App;
