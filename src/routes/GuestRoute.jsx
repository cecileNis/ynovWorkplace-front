import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
const GuestRoute = (Component) => {
    const loggedUser = useSelector(state => state.auth.loggedUser);
    return (
        loggedUser ? <Navigate to='/profile' /> : Component
    )
}
export default GuestRoute