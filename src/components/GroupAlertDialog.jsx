import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { setToast } from "../store/reducers/toast";
import { addRequest } from "../store/reducers/request";
import axios from "axios";
import { API_URL } from "../conf/api.conf";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GroupAlertDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const group = useSelector((state) => state.group.current);
  const dispatch = useDispatch();
  const token = `Bearer ${localStorage.getItem("TOKEN")}`;

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/group_requests`,
        { targetGroup: group["@id"] },
        { headers: { Authorization: token } }
      );
      if (response.status !== 201) throw new Error(response.statusText);
      dispatch(addRequest(response.data));
      dispatch(setToast({ severity: "success", message: "Une demande a été envoyée" }));
      setOpen(false);
    } catch (e) {
      dispatch(setToast({ severity: "error", message: e.message }));
      console.error(e);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ backgroundColor: "black", color: "white", "&:hover": { color: "black", borderColor: "black" } }}
        onClick={handleClickOpen}
      >
        M'inscrire a ce groupe
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ backgroundColor: "black", color: "white" }}>{"Inscription groupe"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{ mt: 3 }}>
            Vous souhaitez vous inscrire à ce groupe, cliquez sur "Inscription" pour envoyer une requête à
            l'administrateur de ce groupe.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{ backgroundColor: "black", color: "white", "&:hover": { color: "black", borderColor: "black" } }}
            size="lg"
            onClick={handleClose}
          >
            Fermer
          </Button>
          <Button
            variant="outlined"
            sx={{ backgroundColor: "red", color: "white", "&:hover": { color: "red", borderColor: "red" }, mr: 2 }}
            size="lg"
            onClick={handleClick}
          >
            Inscription
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
