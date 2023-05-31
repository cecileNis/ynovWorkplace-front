import {Button, TextField} from "@mui/material";
import {API_URL} from "../conf/api.conf";

import React, {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setLoggedUser} from "../store/reducers/auth";
import {useNavigate} from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

function NewUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = API_URL + "/api/users";

    const theme = createTheme();

    const onCreate = async (event) => {
        event.preventDefault();
        try {
            let payload = {email, plainPassword: password, nickname};
            let user = await axios.post(url, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let token = await axios.post(`${API_URL}/auth`, {email, password});
            localStorage.setItem("TOKEN", token.data.token);
            const socket = socketIOClient(ENDPOINT);
            socket.emit("user login", {id: user.data.id, username: user.data.nickname});
            dispatch(setLoggedUser(user.data));
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
                            Créer un compte
                        </Typography>
                        <Box component="form" noValidate onSubmit={onCreate} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid="name-input"
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Pseudo"
                                        autoFocus
                                        onChange={(e) => setNickname(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid="email-input"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid="password-input"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Mot de passe"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button data-testid="submit-register"  type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                                S'inscrire
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/logIn" variant="body2">
                                        vous possédez déjà un compte ? Connectez-vous
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

export default NewUser;
