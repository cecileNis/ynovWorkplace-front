import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const GroupThreadList = ({ threads }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  console.log(threads);
  return (
    <Box component="section">
      <Typography variant="h4" sx={{ my: 5 }}>
        Fils de discussion
      </Typography>
      <Button onClick={() => navigate(`/groups/${groupId}/new-thread`)} sx={{ mb: 5 }} variant="contained" size="small">
        Je crée un fil de discussion
      </Button>
      <Box>
        {threads.map((thread) => (
          <Paper key={thread["@id"]} sx={{ p: 1, mb: 2 }}>
            {thread.title}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default GroupThreadList;
