import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

export const sortUsersByNickname = (users) => {
  let newUsers = [...users];
  newUsers.sort((a, b) => a.nickname.localeCompare(b.nickname));
  return newUsers;
};

function UserList() {
  const users = useSelector((state) => state.user.users);

  return (
    <>
      <Typography variant="h6">liste des utilisateurs</Typography>
      {users.map((user) => (
        <div>
          <Link to={`/user/${user.id}`}>{user.nickname}</Link>
        </div>
      ))}
    </>
  );
}

export default UserList;
