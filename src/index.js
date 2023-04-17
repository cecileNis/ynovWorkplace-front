import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserList from './pages/UserList';
import Header from './components/Header';
import User from './pages/User';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  BrowserRouter
} from "react-router-dom";
import routes from "./routes"
import axios from "axios"
import { setUsers } from './store/reducers/user';
import { setLoggedUser } from './store/reducers/auth';
import NewUser from './pages/NewUser'
import Login from './pages/Login'
import GuestRoute from './routes/GuestRoute';
import PrivateRoute from './routes/PrivateRoute';

/*const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);*/

/*const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <App />
        ),
      },
      {
        path: "userList",
        element: <UserList />,
      },
      {
        path: "user/:userId",
        element: <User />,
      },
      {
        path: "signIn",
        element: GuestRoute(<NewUser />)
      },
      {
        path: "logIn",
        element: <Login />,
      }
    ]
  }
]);*/

const url = "https://ynov-workplace.osc-fr1.scalingo.io"

async function retrieveUsers() {
  try {
    let response = await axios.get(`${url}/api/users`, { params: { page: 5 } });
    let users = response.data["hydra:member"]
    console.log(users);
    store.dispatch(setUsers(users));
  } catch (e) {
    store.dispatch(setUsers([]));
  }

}

async function retrieveLoggedUser() {
  try {
    let loggedUser = await axios.get(`${url}/api/users/1/info`, { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } })
    console.log(loggedUser.data);
    let user = loggedUser.data
    console.log(user);
    //let userLogged = { nickname: user.nickname, id: user.id }
    store.dispatch(setLoggedUser(user))
  } catch (e) {
  }

}

Promise.all([retrieveLoggedUser(), retrieveUsers()]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </Provider>

  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
