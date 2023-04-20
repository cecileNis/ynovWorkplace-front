import { Grid, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import AlertDialog from "../components/Dialog";

function Profile() {
    const loggedUser = useSelector(state => state.auth.loggedUser);
    if(!loggedUser) return <p>loading</p>
    const pseudo = loggedUser.nickname;
    const email = loggedUser.email;

    return (
        <Container fixed>
            <Typography variant="h3" sx={{textAlign: "center", paddingBottom: "4%", paddingTop: "4%"}}>Bienvenue {pseudo}</Typography>
                <Grid container>
                    <Grid item xs={6} sx={{display: "flex", justifyContent: "center", paddingBottom: "4%"}}>
                        <Box>
                            <Typography variant="h5">Vos informations</Typography>
                            <Typography variant="body1">Pseudo: {pseudo}</Typography>
                            <Typography variant="body1" component="p">Email: {email}</Typography>
                            <div><AlertDialog /></div>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} sx={{display: "flex", justifyContent: "center"}}>
                        <Box>
                            <Typography variant="h5">Groupes abonnés</Typography>
                            <div><Link to="/" style={{ color: "black", textDecoration: "none" }}>Groupe 1</Link></div>
                            <div><Link to="/" style={{ color: "black", textDecoration: "none" }}>Groupe 2</Link></div>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{display: "flex", justifyContent: "center"}}>
                        <Box>
                            <Typography variant="h5">Groupes créer</Typography>
                            <div><Link to="/" style={{ color: "black", textDecoration: "none" }}>Groupe 3</Link></div>
                            <div><Link to="/" style={{ color: "black", textDecoration: "none" }}>Groupe 4</Link></div>
                        </Box>
                    </Grid>
                </Grid>
        </Container>
    );
  }
  
  export default Profile;
  
