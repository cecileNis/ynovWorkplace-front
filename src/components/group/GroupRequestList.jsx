import { Box, Typography } from "@mui/material";
import React from "react";
import GroupRequest from "./GroupRequest";

const GroupRequestList = ({ requests }) => {
  return (
    <Box component="section">
      <Typography variant="h4" sx={{ my: 5 }}>
        Requêtes en cours
      </Typography>
      <Box>
        {requests.map((request, i) => (
          <GroupRequest
            key={request.id}
            request={request}
            img={`https://source.unsplash.com/collection/${i}/200x200`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default GroupRequestList;
