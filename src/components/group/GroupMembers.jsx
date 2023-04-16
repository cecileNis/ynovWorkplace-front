import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../conf/api.conf";
import UserCard from "../../components/UserCard";

const GroupMembers = () => {
  const { groupId } = useParams();
  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_URL}/api/groups/${groupId}/members`);
        setMembers(response.data["hydra:member"]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [groupId]);

  return (
    <Box component="section">
      <Typography variant="h4" sx={{ my: 5 }}>
        Membres
      </Typography>
      <Box>
        {members.map((user, i) => {
          <UserCard user={user} img={`https://source.unsplash.com/collection/${i}/200x200`} />;
        })}
      </Box>
    </Box>
  );
};

export default GroupMembers;
