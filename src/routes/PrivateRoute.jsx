import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { setToast } from "../store/reducers/toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = (Component) => {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const loading = useSelector((state) => state.loading.value);

  if (loading) return <Loader />;
  return loggedUser ? (
    Component
  ) : (
    <Navigate
      to="/logIn"
      state={{ severity: "error", message: "Vous n'êtes pas connecté(e)" }}
    />
  );
};
export default PrivateRoute;
