import {Button, TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoggedUser } from '../store/reducers/auth';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = "https://ynov-workplace.osc-fr1.scalingo.io"
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      console.log(email)
      console.log(password);
      let token = await axios.post(`${url}/auth`, {email, password});
      localStorage.setItem("TOKEN", token.data.token)
      console.log(token);
      let loggedUser = await axios.get(`${url}/api/users/1/info`, { headers: { Authorization: `Bearer ${token.data.token}`}})
      console.log(loggedUser.data);
      let user = loggedUser.data
      console.log(user);
      dispatch(setLoggedUser(user))
      navigate('/profile')

    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onLogin}>Se connecter</Button>
    </>

  );
}

export default Login;
