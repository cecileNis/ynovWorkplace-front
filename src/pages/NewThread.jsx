import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { API_URL } from "../conf/api.conf";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../store/reducers/auth";
import { useNavigate, useParams } from "react-router-dom";
import { setGroups } from "../store/reducers/group";
import { setToast } from "../store/reducers/toast";

const NewThread = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const title = React.useRef("");
  const content = React.useRef("");

  const url = `${API_URL}/api/threads`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = `Bearer ${localStorage.getItem("TOKEN")}`;

    try {
      const response = await axios.post(
        url,
        { title: title.current.value, content: content.current.value, relatedGroup: `/api/groups/${groupId}` },
        { headers: { Authorization: token } }
      );

      if (response.status === 401) {
        throw new Error(response.statusText);
      }

      // dispatch(setGroups(response.data));
      navigate(`/groups/${groupId}`);
      dispatch(
        setToast({
          message: "Fil créé avec succès !",
          severity: "success",
        })
      );
    } catch (error) {
      localStorage.removeItem("TOKEN");
      console.log(error);
      dispatch(setLoggedUser(null));
      dispatch(setToast({ message: error.message, severity: "error" }));
      navigate("/logIn");
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 5,
      }}
    >
      <Typography component="h1" variant="h4" gutterBottom>
        Je créé mon Fil
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField sx={{ mb: 2 }} inputRef={title} label="Titre du fil" />
        <TextField sx={{ mb: 2 }} inputRef={content} label="Contenu du groupe" multiline rows={4} />
        <Button type="submit">Créer le fil</Button>
      </Box>
    </Container>
  );
};

export default NewThread;
