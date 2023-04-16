import { IconButton, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { setToast } from "../../store/reducers/toast";
import axios from "axios";

import { API_URL } from "../../conf/api.conf";
import UserCard from "../UserCard";

const GroupRequest = ({ user, img, requestId }) => {
  const dispatch = useDispatch();

  const acceptRequest = async () => {
    try {
      const token = `Bearer ${localStorage.getItem("TOKEN")}`;
      const response = await axios.post(
        `${API_URL}/api/group_requests/${requestId}/accept`,
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
    <Box
      sx={{
        position: "relative",
      }}
    >
      <UserCard user={user} img={img} />
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
          p: 1,
        }}
      >
        <IconButton onClick={acceptRequest}>
          <CheckIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GroupRequest;
