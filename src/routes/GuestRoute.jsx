import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const GuestRoute = (Component) => {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const loading = useSelector((state) => state.loading.value);
  if (loading) return <Loader />;
  return loggedUser ? <Navigate to="/" /> : Component;
};
export default GuestRoute;
