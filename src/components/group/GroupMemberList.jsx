import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const GroupMemberList = ({ members }) => {
  const users = useSelector((state) => state.user.loggedUsers);

  const usersIds = users.map(({ id }) => `/api/users/${id}`);

  console.log(members)

  return (
    <Box component="section">
      <Typography variant="h4" sx={{ my: 5 }}>
        Membres
      </Typography>
      <Box>
        {members.map((user) => (
          <Paper key={user} sx={{ p: 1, mb: 2 }}>
            {user} {usersIds.includes(user) ? "Connecté(e)" : "Déconnecté(e)"}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default GroupMemberList;
