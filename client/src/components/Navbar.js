import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit">
        <Link to="/">Twitter App</Link>
      </Typography>
      <Button color="inherit">
        <Link to="/streaming">Streaming</Link>
      </Button>
      <Button color="inherit">
        <Link to="/signin">Signin</Link>
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
