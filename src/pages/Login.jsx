import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setLoggedUser} from "../store/reducers/auth";
import {API_URL, INFO_ID} from "../conf/api.conf";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const url = API_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const theme = createTheme();

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            let token = await axios.post(`${url}/auth`, {email, password});
            localStorage.setItem("TOKEN", token.data.token);
            let loggedUser = await axios.get(`${url}/api/users/${INFO_ID}/info`, {
                headers: {Authorization: `Bearer ${token.data.token}`},
            });
            let user = loggedUser.data;
            const socket = socketIOClient(ENDPOINT);
            socket.emit("user login", {id: user.id, username: user.nickname});
            dispatch(setLoggedUser(user));
            navigate("/profile");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Connexion
                        </Typography>
                        <Box component="form" onSubmit={onLogin} noValidate sx={{mt: 1}}>
                            <TextField
                                data-testid="email-input"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                data-testid="password-input"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button data-testid="submit-login" type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                                Se connecter
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/signIn" variant="body2">
                                        {"Vous n'avez pas de compte? enregistrez-vous ici"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default Login;
