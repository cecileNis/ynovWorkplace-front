import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { setLoggedUser } from "../store/reducers/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const loggedUser = useSelector((state) => state.auth.loggedUser);

  let pages = { Home: "/", Groupes: "/groups" };
  let settings = { "se connecter": "/logIn", "s'enregistrer": "/signIn" };

  if (loggedUser) {
    pages = { ...pages, "User List": "/userList" };
    settings = { Profile: "/Profile", "se déconnecter": "/logIn" };
  }

  const dispatch = useDispatch();

  const disconnect = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("user logout", { id: loggedUser.id, username: loggedUser.nickname });

    localStorage.removeItem("TOKEN");
    dispatch(setLoggedUser(null));
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Ynov Workplace
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Object.entries(pages).map(([key, link]) => (
                <MenuItem key={key} onClick={handleCloseNavMenu} component={RouterLink} to={link}>
                  <Typography textAlign="center">{key}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Object.entries(pages).map(([key, link]) => (
              <Button
                data-testid={key}
                key={key}
                component={RouterLink}
                to={link}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "monospace",
                }}
                onMouseOver={(e) => {
                  e.target.style.fontWeight = "bold";
                  e.target.style.transition = "all 0.5s ease";
                  e.target.style.background = "transparent";
                }}
                onMouseOut={(e) => {
                  e.target.style.fontWeight = "normal";
                  e.target.style.transition = "all 0.5s ease";
                }}
              >
                {key}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Gestion de profil">
              <IconButton data-testid="settings-menu" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.entries(settings).map(([key, link]) =>
                key === "se déconnecter" ? (
                  <MenuItem
                    data-testid={key}
                    key={key}
                    onClick={() => {
                      handleCloseUserMenu();
                      disconnect();
                    }}
                  >
                    <Typography textAlign="center">{key}</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem data-testid={key} key={key} component={RouterLink} to={link} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{key}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
