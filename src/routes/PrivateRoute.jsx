import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
const PrivateRoute = (Component) => {
    const loggedUser = useSelector(state => state.auth.loggedUser);
    return (
        loggedUser ? Component : <Navigate to='/' />
    )
}
export default PrivateRoute