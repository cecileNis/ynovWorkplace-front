import { IconButton, Paper } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { setToast } from "../../store/reducers/toast";
import axios from "axios";

import { API_URL } from "../../conf/api.conf";

const GroupRequest = ({ request }) => {
  console.log(request);
  const dispatch = useDispatch();
  const acceptRequest = async () => {
    try {
      const token = `Bearer ${localStorage.getItem("TOKEN")}`;
      const response = await axios.post(
        `${API_URL}/api/group_requests/${request.id}/accept`,
        {},
        { headers: { Authorization: token } }
      );
      if (response.status !== 201) throw new Error(response.statusText);
      dispatch(setToast({ severity: "success", message: "Utilisateur ajouté" }));
    } catch (e) {
      dispatch(setToast({ severity: "error", message: e.message }));
    }
  };

  return (
    <Paper sx={{ display: "flex", justifyContent: "space-between", p: 1, mb: 2 }}>
      {request.targetUser}
      <IconButton color="success" onClick={acceptRequest}>
        <CheckIcon sx={{ fontSize: "16px" }} />
      </IconButton>
    </Paper>
  );
};

export default GroupRequest;
