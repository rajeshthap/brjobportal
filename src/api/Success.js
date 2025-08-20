import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/UserLogin");
    }, 60000); //  1 minute = 60000 ms

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Thank You!</h1>
      <p>You have been successfully logged out.</p>
      <p style={{ color: "gray" }}>
        Redirecting to login in <strong>1 minute...</strong>
      </p>
      <Link to="/UserLogin">
        <Button variant="primary">Go to Login</Button>
      </Link>
    </div>
  );
};

export default Success;
