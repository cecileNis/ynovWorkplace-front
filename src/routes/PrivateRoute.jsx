import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const PrivateRoute = (Component) => {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const loading = useSelector((state) => state.loading.value);
  if (loading) return <Loader />;
  if(loggedUser){
    return Component
  } else {
    //setToast
    return <Navigate to="/" />
  }
};
export default PrivateRoute;
