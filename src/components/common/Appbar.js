import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListIcon from "@material-ui/icons/List";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AppsIcon from "@material-ui/icons/Apps";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router-dom";
import Auth from "../../helpers/Auth";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	pointy: {
		cursor: "pointer",
	},
}));

export default function MenuAppBar() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const history = useHistory();
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// Route changes
	const toAdd = () => {
		handleClose();
		history.push("/add");
	};
	const toDashboard = () => {
		handleClose();
		history.push("/dashboard");
	};
	const toHome = () => {
		history.push("/");
	};

	// Logout clicked
	const logout = () => {
		let isOut = Auth.removeAuth();

		if (isOut) {
			history.push("/login");
		} else {
			console.log("Error logging out");
		}
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography onClick={toHome} variant="h6" className={classes.title}>
						<span className={classes.pointy}>
							{" "}
							<span role="img" aria-label="briefcase emoji">
								💼
							</span>{" "}
							JobMate
						</span>
					</Typography>
					<div>
						<MenuIcon
							aria-label="Menu to navigate"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AppsIcon />
						</MenuIcon>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={toAdd}>
								<AddCircleOutlineIcon />
								{"  "}
								Add Application
							</MenuItem>
							<MenuItem onClick={toDashboard}>
								<ListIcon />
								{"  "}
								All Applications
							</MenuItem>
							<MenuItem onClick={logout}>
								<ExitToAppIcon />
								{"  "}
								Logout
							</MenuItem>
							<a
								href="https://jobmate.work/guide"
								target="_blank"
								rel="noopener noreferrer"
								style={{ textDecoration: "none", color: "inherit" }}
							>
								<MenuItem>
									<HelpOutlineIcon />
									{"  "}
									Guide
								</MenuItem>
							</a>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
