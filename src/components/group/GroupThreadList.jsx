import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GroupThreadList = ({ threads, onSearch, onReset }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const handleSearchClick = async () => {
    if (title.length > 0 || content.length > 0) {
      await onSearch(title, content);
    }
  };

  const handleCancel = async () => {
    setTitle("");
    setContent("");
    await onReset();
  };

  console.log(threads);
  return (
    <Box component="section" maxWidth="800px" mr="auto" ml="auto">
      <Typography variant="h4" sx={{ my: 5, textAlign: "center" }}>
        Fils de discussion
      </Typography>
      <Container maxWidth="400px" sx={{ gap: "5px", mr: "auto", ml: "auto", display: "flex", justifyContent: "center" }}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Rechercher par titre"
          variant="outlined"
          size="small"
          sx={{ mb: 2, mr: 1 }}
        />
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          label="Rechercher par contenu"
          variant="outlined"
          size="small"
          sx={{ mb: 2, mr: 1 }}
        />
        <Box
          component="span"
          sx={{
            display: "flex",
            gap: "5px",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleSearchClick}
            variant="contained"
            size="small"
            sx={{ height: "40px", mb: 1 }}
          >
            Rechercher
          </Button>
          {(title.length > 0 || content.length > 0) && (
            <Button
              onClick={handleCancel}
              variant="contained"
              color="error"
              size="small"
              sx={{ height: "40px" }}
            >
              Annuler
            </Button>
          )}
        </Box>
      </Container>

      <Button
        onClick={() => navigate(`/groups/${groupId}/new-thread`)}
        sx={{ mb: 5, mr: "auto", ml: "auto", display: "block" }}
        variant="contained"
        size="small"
      >
        Je crée un fil de discussion
      </Button>
      <Box>
        {threads.map((thread) => (
          <Paper
            key={thread["@id"]}
            sx={{ p: 1, mb: 2, cursor: "pointer" }}
            onClick={() =>
              navigate(
                `/groups/${groupId}/threads/${thread["@id"].split("/")[3]}`
              )
            }
          >
            {thread.title}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default GroupThreadList;
