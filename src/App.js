import routes from "./routes";
import { useLocation, useRoutes, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./components/Toast";
import { useEffect, useState } from "react";
import { setToast } from "./store/reducers/toast";

import socketIOClient from "socket.io-client";
import { setLoggedUsers } from "./store/reducers/user";
const ENDPOINT = "http://127.0.0.1:4001";

export default function App() {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const loggedUsers = useSelector((state) => state.user.loggedUsers);
  const routing = useRoutes(routes(loggedUser));
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state) {
      dispatch(
        setToast({
          severity: location.state.severity,
          message: location.state.message,
        })
      );
      location.state = null;
    }
  }, [loggedUser, location]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("new login", (data) => {
      dispatch(setLoggedUsers(data));
      console.log(data);
    });
  }, []);

  return (
    <>
      <Toast />
      {routing}
    </>
  );
}
