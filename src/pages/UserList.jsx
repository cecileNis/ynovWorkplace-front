import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UserList() {
  const users = useSelector(state => state.user.users);

  return (
    <>
      {users.map((user) =>
        <div>
          <Link to={`/user/${user.id}`}>{user.nickname}</Link>
        </div>
      )}
    </>

  );
}

export default UserList;
