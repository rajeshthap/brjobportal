// components/Loading.js
import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading Jobs...</span>
    </Spinner>
  </div>
);

export default Loading;
