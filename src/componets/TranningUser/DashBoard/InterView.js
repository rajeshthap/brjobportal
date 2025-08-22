import React, { useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Col } from "react-bootstrap";
import { Row, Accordion, Card } from "react-bootstrap";
import "../../../assets/css/RHSNav.css";
import { Link } from "react-router-dom";
import "../../../assets/css/Python.css";
import { RiCheckboxCircleFill } from "react-icons/ri";
const InterView = () => {
  const [isRHSClosed, setIsRHSClosed] = useState(false);

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
                <h3 className="section-heading">
                  📚 Interview Skills Training Program Outline
                </h3>
                <Accordion defaultActiveKey="0" flush alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      1. Introduction to Interview Skills
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Importance of Interview Skills in Career Success{" "}
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Types of Interviews (HR, Technical, Panel, Group
                            Discussions, Video Interviews) <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Common Challenges & How to Overcome Nervousness
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      2. Resume & Cover Letter Preparation
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Crafting a Professional Resume (Do’s & Don’ts)
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Writing an Impactful Cover Letter
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Customizing Your Resume for Different Roles
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      3. Communication Skills for Interviews
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Verbal Communication (Clarity, Tone, Confidence)
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Non-Verbal Communication (Posture, Eye Contact,
                            Handshakes)
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Active Listening Skills
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      4. Pre-Interview Preparation
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Researching the Company & Job Role
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Understanding Job Descriptions & Keywords
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Preparing Your 30-Second Elevator Pitch
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Dressing for Success (Grooming & Power Dressing
                            Tips)
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      5. Common Interview Questions & Answers
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Tell Me About Yourself (Crafting the Perfect Answer)
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Strengths & Weaknesses
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Why Should We Hire You?
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Behavioral Questions (STAR Method: Situation, Task,
                            Action, Result)
                            <br />{" "}
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Handling Salary Negotiation Questions
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="5">
                    <Accordion.Header>
                      6. Mock Interviews & Feedback
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            One-on-One Practice Sessions (HR & Technical)
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Group Discussions (GD Practice for Campus
                            Placements)
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Feedback on Body Language, Tone, and Content
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Improving Confidence Through Role-Plays
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="6">
                    <Accordion.Header>
                      7. Advanced Interview Techniques
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            How to Answer Situational/Problem-Solving Questions
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Handling Stress Interviews & Unexpected Questions
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Asking Smart Questions to Interviewers
                            <br />{" "}
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Following Up After an Interview (Thank-You Email
                            Etiquette)
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="7">
                    <Accordion.Header>8. Closing the Program</Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Building a Positive First & Last Impression
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Maintaining Professionalism Post-Interview
                            <br />
                            <RiCheckboxCircleFill className="bullet-points" />{" "}
                            Creating a Personal Action Plan for Job Success
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card>
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

export default InterView;
