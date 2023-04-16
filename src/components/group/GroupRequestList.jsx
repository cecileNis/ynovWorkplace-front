import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../conf/api.conf";
import GroupRequest from "./GroupRequest";

const GroupRequestList = () => {
  const { groupId } = useParams();
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_URL}/api/groups/${groupId}/requests`);
        setRequests(response.data["hydra:member"]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [groupId]);

  return (
    <Box component="section">
      <Typography variant="h4" sx={{ my: 5 }}>
        Requêtes en cours
      </Typography>
      <Box>
        {requests.map((user, i) => {
          <GroupRequest user={user} img={`https://source.unsplash.com/collection/${i}/200x200`} />;
        })}
      </Box>
    </Box>
  );
};

export default GroupRequestList;
