import React, { useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Col, Container, Row } from "react-bootstrap";
import "../../../assets/css/RHSNav.css"

const UserTrainingDashBoard = () => {
  const [isRHSClosed, setIsRHSClosed] = useState(false);

  const toggleRHSNav = () => setIsRHSClosed(!isRHSClosed);

  return (
    <div className={`dashboard-container d-flex ${isRHSClosed ? "rhs-closed" : ""}`}>
      {/* Main Content */}
      <div className="main-content flex-grow-1">
        <TrainingNavBar isRHSClosed={isRHSClosed} toggleRHSNav={toggleRHSNav} />
        <Row className="d-flex justify-content-end">
          <Col lg={10} sm={12} md={10}>
               <div className="dashboard-box p-3">
  <h4>Dashboard Content Python</h4>
  <p></p>
</div>
          </Col>
          <Col lg={2} sm={2} md={12}>
         <RHSNav />
          </Col>
        </Row>
  

      </div>

    
    </div>
  );
};

export default UserTrainingDashBoard;
