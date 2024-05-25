import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const username = user.name;

  return (
    <>
      {isAuthenticated && (
        <div>
          {/* <h2>{username}</h2> */}
        </div>
      )}
      <button className="text-md bg-orange-400 text-white py-1 px-3 rounded-md" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    </>
  );
};

export default LogoutButton;