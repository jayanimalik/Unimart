import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <h2>Profile</h2>
        <div>
          <img src={user.picture} alt={user.name} />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add other profile information as needed */}
        </div>
      </div>
    )
  );
};

export default Profile;
