import React, { useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Button, Col } from "react-bootstrap";
import { Row, Accordion, Card } from "react-bootstrap";
import "../../../assets/css/RHSNav.css";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/Python.css";
import Image1 from "../../../coming-soon.jpg";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
const UpcomingEvent = () => {
  const [isRHSClosed, setIsRHSClosed] = useState(false);
const navigate = useNavigate();
  const toggleRHSNav = () => setIsRHSClosed(!isRHSClosed);

  return (
    <div
      className={`dashboard-container d-flex ${
        isRHSClosed ? "rhs-closed" : ""
      }`}
    >
      {/* Main Content */}
      <div className="main-content-details-data flex-grow-1">
        <TrainingNavBar isRHSClosed={isRHSClosed} toggleRHSNav={toggleRHSNav} />
        <Row className="d-flex justify-content-end main-content-details">
          <Col lg={10} sm={12} md={10}>
            <div className="dashboard-box p-3">
              <div className="main-contanier">
                <div className="my-3 main-mt-0">
                  {/* <div className="text-center m-3 mobile-register">
                           <Link to="/UserRegistration">
                           <button className="btn btn-primary rounded-pill px-4 mobile-register-now">
                             Register Now
                           </button>
                           </Link>
                         </div> */}
                  <div className="training-wrapper-py p-4">
                    <Row>

                      {/* Left Column (Accordion) */}
                <Col md={12} sm={12} lg={12} className="mb-4">
                
                <Card>
                   <div className="pay-now-register">
 <h3></h3>
                   <div className="pay-now-btn-dsbl">
                                <button
                                  className="btn btn-primary rounded-pill dash-board-btn px-4"
                                  disabled
                                 
                                >
                                  Pay Now
                                </button>
                              </div>
                              </div>
                          <div className='comming-soon'>
      <img src={Image1} alt="Coming Soon" />
    </div></Card>
    
                        </Col>
                        
  <Col md={1} sm={12}>
              <Button variant="" className="back-btn" onClick={() => navigate(-1)}>
                <MdKeyboardBackspace /> Back
              </Button>
            </Col>

                      {/* Right Column (Registration) */}
                    </Row>
                  </div>
                </div>
              </div>
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

export default UpcomingEvent;
