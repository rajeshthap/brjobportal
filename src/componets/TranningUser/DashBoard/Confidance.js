import React, { useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Button, Col } from "react-bootstrap";
import { Row, Accordion, Card } from "react-bootstrap";
import "../../../assets/css/RHSNav.css";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/Python.css";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
const Confidance = () => {
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
                        <h3 className="section-heading">
                          📚 Self-Confidence & Power Dressing Training Program
                        </h3>
                         <div className="pay-now-btn-dsbl">
                                <button
                                  className="btn btn-primary rounded-pill dash-board-btn px-4"
                                  disabled
                                 
                                >
                                  Pay Now
                                </button>
                              </div>
                        </div>
                        <Accordion defaultActiveKey="0" flush alwaysOpen>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              1. Introduction to Self-Confidence & Image Building
                            </Accordion.Header>
                            <Accordion.Body>
                              <Card className="module-card">
                                <Card.Body>
                                  <ul>
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    What is Self-Confidence? <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Importance of Confidence in Personal & Professional
                                    Life <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    First Impressions: Why They Matter <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Role of Grooming & Dressing in Confidence
                                  </ul>
                                </Card.Body>
                              </Card>
                            </Accordion.Body>
                          </Accordion.Item>
        
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>
                              2. Self-Confidence Development
                            </Accordion.Header>
                            <Accordion.Body>
                              <Card className="module-card">
                                <Card.Body>
                                  <ul>
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Overcoming Self-Doubt & Negative Thinking
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Building a Positive Mindset
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Body Language for Confidence (Posture, Eye Contact,
                                    Gestures)
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Voice Modulation & Speaking Confidently
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Power Posing Techniques
                                  </ul>
                                </Card.Body>
                              </Card>
                            </Accordion.Body>
                          </Accordion.Item>
        
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>
                              3. Power Dressing Basics
                            </Accordion.Header>
                            <Accordion.Body>
                              <Card className="module-card">
                                <Card.Body>
                                  <ul>
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    What is Power Dressing?
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Dressing for Success: Aligning with Your Role &
                                    Industry
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Understanding Dress Codes (Formal, Business Casual,
                                    Smart Casual)
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Colors & Their Impact (Psychology of Colors)
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Dressing as per Body Type
                                  </ul>
                                </Card.Body>
                              </Card>
                            </Accordion.Body>
                          </Accordion.Item>
        
                          <Accordion.Item eventKey="3">
                            <Accordion.Header>
                              4. Personal Grooming & Styling Tips
                            </Accordion.Header>
                            <Accordion.Body>
                              <Card className="module-card">
                                <Card.Body>
                                  <ul>
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Hygiene & Grooming Essentials
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Haircare & Skincare Basics
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Accessories: Minimal vs Statement Pieces
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Footwear & Bags: Completing the Look
                                  </ul>
                                </Card.Body>
                              </Card>
                            </Accordion.Body>
                          </Accordion.Item>
        
                          <Accordion.Item eventKey="4">
                            <Accordion.Header>
                              5. Power Dressing for Professionals
                            </Accordion.Header>
                            <Accordion.Body>
                              <Card className="module-card">
                                <Card.Body>
                                  <ul>
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Corporate Dressing for Men (Suits, Shirts, Ties,
                                    Shoes)
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Corporate Dressing for Women (Formal Wear, Sarees,
                                    Business Dresses)
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Dressing for Interviews & Presentations
                                    <br />✅ Mistakes to Avoid in Workplace Dressing
                                  </ul>
                                </Card.Body>
                              </Card>
                            </Accordion.Body>
                          </Accordion.Item>
        
                          <Accordion.Item eventKey="5">
                            <Accordion.Header>
                              6. Practical Sessions & Activities
                            </Accordion.Header>
                            <Accordion.Body>
                              <Card className="module-card">
                                <Card.Body>
                                  <ul>
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Self-Confidence Role Plays (Interviews,
                                    Presentations)
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Wardrobe Planning: Do’s & Don’ts
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Dressing Challenges (Pick the Right Look for a
                                    Scenario)
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Personalized Feedback on Dressing Style
                                  </ul>
                                </Card.Body>
                              </Card>
                            </Accordion.Body>
                          </Accordion.Item>
        
                          <Accordion.Item eventKey="6">
                            <Accordion.Header>
                              7. Integration & Takeaways
                            </Accordion.Header>
                            <Accordion.Body>
                              <Card className="module-card">
                                <Card.Body>
                                  <ul>
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Building Your Signature Style
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Dressing for Different Occasions (Office Parties,
                                    Client Meetings, Public Speaking)
                                    <br />
                                    <RiCheckboxCircleFill className="bullet-points" />{" "}
                                    Creating a 30-Second Power Introduction (Confidence
                                    Booster)
                                  </ul>
                                </Card.Body>
                              </Card>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Card>
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

export default Confidance;
