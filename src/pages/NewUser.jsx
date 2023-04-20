import { Button, TextField } from '@mui/material';

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoggedUser } from '../store/reducers/auth';
import { useNavigate } from 'react-router-dom';

function NewUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const url = "https://ynov-workplace.osc-fr1.scalingo.io";
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onCreate = async () => {
    try {
      let payload = { email, plainPassword: password, nickname };
      console.log(payload);
      let user = await axios.post(
        `${url}/api/users`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      console.log(user);
      let token = await axios.post(`${url}/auth`, {email, password});
      localStorage.setItem("TOKEN", token.data.token)
      dispatch(setLoggedUser(user.data))
      navigate('/profile')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField id="outlined-basic" label="Nickname" variant="outlined" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onCreate}>S'inscrire</Button>
    </>

  );
}

export default NewUser;
