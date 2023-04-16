import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import Toast from "./components/Toast";

export default function App() {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const routing = useRoutes(routes(loggedUser));


  return (
    <>
      <Toast />
      {routing}
    </>
  );
}
