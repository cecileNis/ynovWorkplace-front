import routes from "./routes";
import { useLocation, useRoutes, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./components/Toast";
import { useEffect } from "react";
import { setToast } from "./store/reducers/toast";

export default function App() {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
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
    console.log("loggedUser", loggedUser);
  }, [loggedUser, location]);

  return (
    <>
      <Toast />
      {routing}
    </>
  );
}
