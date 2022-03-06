import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
const Landing = () => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/dashboard" />
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};
export default Landing;
