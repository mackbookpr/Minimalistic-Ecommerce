import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()} className="text-md bg-orange-400 text-white py-1 px-3 rounded-md">Log In</button>;
};

export default LoginButton;