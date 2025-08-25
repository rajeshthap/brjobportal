import React, { useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Button, Col } from "react-bootstrap";
import { Row, Accordion, Card } from "react-bootstrap";
import "../../../assets/css/RHSNav.css";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/Python.css";
import { MdKeyboardBackspace } from "react-icons/md";
const Bootstrap = () => {
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
                              📚 HTML, CSS & Bootstrap Training Program
                            </h3>

                            <div className="">
                              <Button
                                variant=""
                                className="back-btn mt-3 mx-3"
                                onClick={() => navigate(-1)}
                              >
                                <MdKeyboardBackspace /> Back
                              </Button>

                              <button
                                className="btn btn-primary  dash-board-btn px-4 pay-now-btn-dsbl"
                                disabled
                              >
                                Pay Now
                              </button>
                            </div>
                          </div>
                          <Accordion defaultActiveKey="0" flush alwaysOpen>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                1. HTML (HyperText Markup Language)
                              </Accordion.Header>
                              <Accordion.Body>
                                <Card className="module-card">
                                  <Card.Body>
                                    ✅ Introduction to HTML
                                    <ul>
                                      <li>What is HTML? </li>
                                      <li>
                                        HTML structure (DOCTYPE, html, head,
                                        body){" "}
                                      </li>
                                      <li>
                                        Setting up a development environment
                                        (VSCode, Live Server){" "}
                                      </li>
                                      <li>Writing your first HTML page</li>
                                    </ul>
                                    <br />✅ HTML Basics
                                    <ul>
                                      <li>What is HTML? </li>
                                      <li>
                                        HTML structure (DOCTYPE, html, head,
                                        body){" "}
                                      </li>
                                      <li>
                                        Setting up a development environment
                                        (VSCode, Live Server){" "}
                                      </li>
                                      <li>Writing your first HTML page</li>
                                    </ul>
                                    <br />✅ HTML5 Features
                                    <ul>
                                      <li>Audio and Video tags </li>
                                      <li>
                                        Semantic Elements (&lt;header&gt;,
                                        &lt;footer&gt;, &lt;article&gt;,
                                        &lt;section&gt;)
                                      </li>
                                      <li>
                                        Input types and attributes in HTML5
                                      </li>
                                    </ul>
                                  </Card.Body>
                                </Card>
                              </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                              <Accordion.Header>
                                2. CSS (Cascading Style Sheets){" "}
                              </Accordion.Header>
                              <Accordion.Body>
                                <Card className="module-card">
                                  <Card.Body>
                                    ✅ Introduction to CSS
                                    <ul>
                                      <li>What is CSS? </li>
                                      <li>
                                        Inline, Internal, and External CSS{" "}
                                      </li>
                                      <li>
                                        CSS Syntax (Selectors, Properties,
                                        Values)
                                      </li>
                                    </ul>
                                    <br />✅ Selectors & Properties
                                    <ul>
                                      <li>Element, ID, Class Selectors </li>
                                      <li>
                                        Pseudo-classes and Pseudo-elements
                                        (:hover, :nth-child){" "}
                                      </li>
                                      <li>Colors, Backgrounds, Borders</li>
                                      <li>Fonts, Text Styling </li>
                                    </ul>
                                    <br />✅ Box Model
                                    <ul>
                                      <li>Margin, Border, Padding, Content </li>
                                      <li>
                                        Understanding width, height, and
                                        overflow{" "}
                                      </li>
                                    </ul>
                                    <br />✅ Positioning & Layout
                                    <ul>
                                      <li>
                                        Static, Relative, Absolute, Fixed,
                                        Sticky{" "}
                                      </li>
                                      <li>
                                        Display Property (block, inline,
                                        inline-block, none){" "}
                                      </li>
                                      <li>Flexbox (Basics)</li>
                                      <li>CSS Grid (Basics) </li>
                                    </ul>
                                    <br />✅ Transitions & Animations
                                    <ul>
                                      <li>CSS Transitions </li>
                                      <li>Keyframe Animations </li>
                                    </ul>
                                    <br />✅ Responsive Design Basics
                                    <ul>
                                      <li>Media Queries </li>
                                      <li>Units: px, %, em, rem, vh, vw </li>
                                    </ul>
                                  </Card.Body>
                                </Card>
                              </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                              <Accordion.Header>
                                {" "}
                                3. Bootstrap (Responsive Framework)
                              </Accordion.Header>
                              <Accordion.Body>
                                <Card className="module-card">
                                  <Card.Body>
                                    ✅ Introduction to Bootstrap
                                    <ul>
                                      <li>
                                        What is Bootstrap and Why use it?{" "}
                                      </li>
                                      <li>
                                        Setting up Bootstrap (CDN & Local){" "}
                                      </li>
                                    </ul>
                                    <br />✅ Bootstrap Grid System
                                    <ul>
                                      <li>Rows and Columns </li>
                                      <li>Container Classes </li>
                                      <li>Responsive Design with Grid</li>
                                    </ul>
                                    <br />✅ Bootstrap Components
                                    <ul>
                                      <li> Buttons, Alerts, Badges </li>
                                      <li>Navbar, Breadcrumbs, Pagination </li>
                                      <li>
                                        Cards, Modals, Accordion, Carousel
                                      </li>
                                    </ul>
                                    <br />✅ Bootstrap Forms
                                    <ul>
                                      <li>Form Layouts & Controls </li>
                                      <li>Validation Classes </li>
                                    </ul>
                                    <br />✅ Utilities and Helpers
                                    <ul>
                                      <li>Spacing (margins & paddings) </li>
                                      <li>Text Alignment and Colors </li>
                                      <li>Display Utilities</li>
                                    </ul>
                                    <br />✅ Bootstrap 5 New Features
                                    <ul>
                                      <li>Updated Grid System </li>
                                      <li>Customizable utilities </li>
                                    </ul>
                                    <br />
                                  </Card.Body>
                                </Card>
                              </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                              <Accordion.Header>
                                4. Mini Projects (Hands-On Practice)
                              </Accordion.Header>
                              <Accordion.Body>
                                <Card className="module-card">
                                  <Card.Body>
                                    <ul>
                                      <li>
                                        Build a Personal Portfolio Website (HTML
                                        & CSS)
                                      </li>
                                      <li>
                                        Create a Responsive Landing Page using
                                        Bootstrap{" "}
                                      </li>
                                      <li>Design a Simple Blog Layout</li>
                                      <li>Build a Login & Registration Form</li>
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

export default Bootstrap;
