import React from "react";
import Container from "@material-ui/core/Container";
import Appbar from "../common/Appbar";
import AddForm from "../AddForm";

export default function Add() {
	return (
		<div>
			<Appbar />
			<Container maxWidth="sm" style={{ textAlign: "center" }}>
				<h1>Add Job Application</h1>
				<p>This is where you will add your job applications for tracking.</p>
				<AddForm />
			</Container>
		</div>
	);
}
