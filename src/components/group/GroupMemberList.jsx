import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const GroupMemberList = ({ members }) => {
  console.log();
  return (
    <Box component="section">
      <Typography variant="h4" sx={{ my: 5 }}>
        Membres
      </Typography>
      <Box>
        {members.map((user) => (
          <Paper key={user} sx={{ p: 1, mb: 2 }}>
            {user}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default GroupMemberList;
