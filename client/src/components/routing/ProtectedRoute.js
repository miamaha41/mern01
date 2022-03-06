import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NavBarMenu from "../layouts/NavBarMenu";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  return (
    <>
      {isAuthenticated ? (
        <>
          <NavBarMenu />
          <Outlet />
        </>
      ) : (
        <Navigate to="auth/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
