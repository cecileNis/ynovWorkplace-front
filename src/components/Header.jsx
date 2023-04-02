import { Link } from "react-router-dom";
import "./Header.css"
import { useSelector } from 'react-redux';

function Header() {
  const loggedUser = useSelector(state => state.auth.loggedUser);
  console.log(loggedUser)
  return (
    <nav className="Header">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/userList">User list</Link></li>
        {!loggedUser && <li><Link to="/logIn">Se connecter</Link></li>}
        {!loggedUser && <li><Link to="/signIn">S'inscrire</Link></li>}
      </ul>
    </nav>
  );
}

export default Header;
