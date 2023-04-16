import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { setToast } from "../store/reducers/toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = (Component) => {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const loading = useSelector((state) => state.loading.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedUser) {
      dispatch(
        setToast({
          message: "Vous devez être connecté pour accéder à cette page",
          severity: "error",
        })
      );
    }
  }, []);

  if (loading) return <Loader />;
  return loggedUser ? Component : <Navigate to="/login" />;
};
export default PrivateRoute;
