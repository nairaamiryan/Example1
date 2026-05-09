import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) return <div>Բեռնվում է...</div>;

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return <Component />;
};

export default ProtectedRoute;