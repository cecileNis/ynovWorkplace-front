import { Button, TextField } from "@mui/material";
import { API_URL } from "../conf/api.conf";

import React, { useState } from "react";
import axios from "axios";

function NewUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const url = API_URL + "/api/users";

  const onCreate = async () => {
    try {
      let payload = { email, plainPassword: password, nickname };
      console.log(payload);
      let user = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Nickname"
        variant="outlined"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onCreate}>S'inscrire</Button>
    </>
  );
}

export default NewUser;
