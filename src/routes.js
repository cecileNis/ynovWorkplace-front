import { Outlet } from "react-router-dom";
import NewUser from "./pages/NewUser";
import Login from "./pages/Login";
import Header from "./components/Header";
import UserList from "./pages/UserList";
import User from "./pages/User";
import Home from "./pages/Home";
import GuestRoute from "./routes/GuestRoute";
import PrivateRoute from "./routes/PrivateRoute";
import NewGroup from "./pages/NewGroup";
import GroupList from "./pages/GroupList";
import GroupDetails from "./pages/GroupDetails";
import NewThread from "./pages/NewThread";
import NotFound from "./pages/NotFound";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const routes = () => [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/userList",
        element: <UserList />,
      },
      {
        path: "user/:userId",
        element: <>{PrivateRoute(<User />)}</>,
      },
      {
        path: "groups",
        element: <>{<GroupList />}</>,
      },
      {
        path: "groups/create",
        element: <>{PrivateRoute(<NewGroup />)}</>,
      },
      {
        path: "groups/:groupId",
        element: <>{PrivateRoute(<GroupDetails />)}</>,
      },
      {
        path: "groups/:groupId/new-thread",
        element: <>{PrivateRoute(<NewThread />)}</>,
      },
      {
        path: "signIn",
        element: <>{GuestRoute(<NewUser />)}</>,
      },
      {
        path: "logIn",
        element: <>{GuestRoute(<Login />)}</>
      },
      {
        path: "profile",
        element: <Profile />
      }
    ],
  },
];

export default routes;
