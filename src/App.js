import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import Toast from "./components/Toast";
import { useEffect } from "react";

export default function App() {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const routing = useRoutes(routes(loggedUser));
  
  useEffect (() => {
    console.log("loggedUser", loggedUser);
  }, [loggedUser]);

  return (
    <>
      <Toast />
      {routing}
    </>
  );
}
