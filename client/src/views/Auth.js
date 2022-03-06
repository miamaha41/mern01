import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { useParams, Outlet, Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import PageNotFound from "../components/layouts/PageNotFound";
import { AuthContext } from "../contexts/AuthContext";
const Auth = ({}) => {
  const navigate = useNavigate();
  let params = useParams();
  let body;
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (params.authId !== "login" && params.authId !== "register") {
    return <PageNotFound />;
  }
  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  } else {
    body = (
      <>
        {params.authId === "login" && <LoginForm />}
        {params.authId === "register" && <RegisterForm />}
      </>
    );
  }

  return (
    <>
      <div className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1>Learn It</h1>
            <h4>Keep track of what you are learning</h4>
            {body}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Auth;
