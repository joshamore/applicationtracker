import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/routes/Home";

function App() {
	return (
		<BrowserRouter>
			<Route path="/" component={Home} />
		</BrowserRouter>
	);
}

export default App;
