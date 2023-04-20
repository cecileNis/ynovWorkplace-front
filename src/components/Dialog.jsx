import * as React from 'react';
import {Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedUser } from '../store/reducers/auth';

export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const loggedUser = useSelector(state => state.auth.loggedUser);
    const id = loggedUser.id;
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleDelete = async () => {
           try {
                const token = localStorage.getItem("TOKEN");
                await axios.delete(`https://ynov-workplace.osc-fr1.scalingo.io/api/users/${id}`, {
                     headers: { Authorization: `Bearer ${token}`}
                    });
                localStorage.removeItem("TOKEN");
                setOpen(false);
                dispatch(setLoggedUser(null));
                navigate('/');
           } catch (e) {
                console.log(e);
           }   
    }
  return (
    <div>
        <Button sx={{ color: "black", border:"solid black", marginTop: "2%"}} onClick={handleClickOpen} variant="outlined">Supprimer mon compte</Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Êtes-vous sûr de vouloir supprimer votre compte ?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleDelete} sx={{ color: "red" }}>Supprimer</Button>
                <Button onClick={handleClose} autoFocus sx={{ color: "black" }}> Annuler</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}