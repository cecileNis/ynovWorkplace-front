import { useParams } from 'react-router-dom';

function User() {
  let { userId } = useParams();

  /**
   * Waiting API connexion, we use the data available on the api docs
   * http://82.65.6.187:8002/api/docs
   * /api/user/:id
   */
  let apiResponse = {
    "@context": "/api/contexts/User",
    "@id": "/api/users/1",
    "@type": "User",
    "id": 1,
    "email": "user@example.com",
    "ownedGroups": [
      "/api/groups/1",
      "/api/groups/2"
    ],
    "subscribedGroups": [
      "/api/groups/1"
    ],
    "nickname": "User A"
  }

  return (
    <>
      <div>Id: {userId}</div>
      <div>
        {apiResponse.nickname}
      </div>
      <div>
        {apiResponse.email}
      </div>
      <div>
        owned groupes :
        {apiResponse.ownedGroups.map((g) => g)}
      </div>
      <div>
        subscribed groupes :
        {apiResponse.subscribedGroups.map((g) => g)}
      </div>

    </>

  );
}

export default User;
