import routes from "./routes";
import { useLocation, useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./components/Toast";
import { useEffect } from "react";
import { setToast } from "./store/reducers/toast";

export default function App() {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const routing = useRoutes(routes(loggedUser));
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state) {
      dispatch(setToast({ severity: state.severity, message: state.message }));
    }
    console.log("loggedUser", loggedUser);
  }, [loggedUser, state]);

  return (
    <>
      <Toast />
      {routing}
    </>
  );
}
