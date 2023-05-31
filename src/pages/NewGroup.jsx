import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { API_URL } from "../conf/api.conf";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { setGroups } from "../store/reducers/group";
import { setToast } from "../store/reducers/toast";

const NewGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = React.useRef("");
  const desc = React.useRef("");

  const url = `${API_URL}/api/groups`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = `Bearer ${localStorage.getItem("TOKEN")}`;

    try {
      const groupRes = await axios.post(
        url,
        { name: name.current.value, description: desc.current.value },
        { headers: { Authorization: token } }
      );

      if (groupRes.status === 401) {
        throw new Error(groupRes.statusText);
      }

      const reqResponse = await axios.post(
        `${API_URL}/api/group_requests`,
        { targetGroup: groupRes.data["@id"] },
        { headers: { Authorization: token } }
      );

      if (reqResponse.status !== 201) throw new Error(reqResponse.statusText);

      const accResponse = await axios.post(
        `${API_URL}/api/group_requests/${reqResponse.data.id}/accept`,
        {},
        { headers: { Authorization: token } }
      );

      if (accResponse.status !== 201) throw new Error(accResponse.statusText);

      dispatch(setGroups(groupRes.data));
      navigate(`/groups/${groupRes.data.id}`);
      dispatch(
        setToast({
          message: "Groupe créé avec succès !",
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
        Je créé mon groupe
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField name="groupe-name" sx={{ mb: 2 }} inputRef={name} label="Nom du groupe" />
        <TextField
          data-testid="groupe-description"
          sx={{ mb: 2 }}
          inputRef={desc}
          label="Description du groupe"
          multiline
          rows={4}
        />
        <Button data-testid="submit-create-group" type="submit">Créer le groupe</Button>
      </Box>
    </Container>
  );
};

export default NewGroup;
