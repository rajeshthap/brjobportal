import React, { useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Container } from "react-bootstrap";
import "../../../assets/css/RHSNav.css"

const UserTrainingDashBoard = () => {
  const [isRHSClosed, setIsRHSClosed] = useState(false);

  const toggleRHSNav = () => setIsRHSClosed(!isRHSClosed);

  return (
    <div className={`dashboard-container d-flex ${isRHSClosed ? "rhs-closed" : ""}`}>
      {/* Main Content */}
      <div className="main-content flex-grow-1">
        <TrainingNavBar isRHSClosed={isRHSClosed} toggleRHSNav={toggleRHSNav} />
       <div className="dashboard-box p-3">
  <h4>Dashboard Content Here</h4>
  <p>Some additional content can go here.</p>
</div>

      </div>

      {/* RHS Navigation */}
      <RHSNav isNavClosedProp={isRHSClosed} toggleNavProp={toggleRHSNav} />
    </div>
  );
};

export default UserTrainingDashBoard;
