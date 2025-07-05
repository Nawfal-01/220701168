import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#333333" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          URL Shortener
        </Typography>
        <Box>
          <Button
            component={RouterLink}
            to="/"
            sx={{ color: "#ffffff" }}
          >
            Shorten URL
          </Button>
          <Button
            component={RouterLink}
            to="/stats"
            sx={{ color: "#ffffff" }}
          >
            View Stats
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
