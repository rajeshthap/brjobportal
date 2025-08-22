import React, { useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Col } from "react-bootstrap";
import { Row, Accordion, Card } from "react-bootstrap";
import "../../../assets/css/RHSNav.css";
import { Link } from "react-router-dom";
import "../../../assets/css/Python.css";
const WebDesign = () => {
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
            <Col md={8} sm={12} className="mb-4">
              <Card>
                <h3 className="section-heading">
                  📚 Web Development Training Program
                </h3>
                <Accordion defaultActiveKey="0" flush alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      1. Introduction to Web Development
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            ✅ What is Web Development? <br />
                            ✅ Frontend vs Backend vs Full Stack <br />
                            ✅ How the Web Works (HTTP, Browsers, Servers){" "}
                            <br />
                            ✅ Tools Setup: VSCode, Browsers, Node.js, Git{" "}
                            <br />
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      2. Frontend Development 
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          ✅ HTML (Structure)
                          <ul>
                            <li>HTML Elements, Attributes, and Structure   </li>
                            <li>Forms, Tables, Multimedia (Audio/Video)  </li>
                            <li>Semantic HTML5 Tags </li>
                          </ul>
                          <br />✅ CSS (Styling)
                          <ul>
                            <li>CSS Syntax, Selectors (class, id, pseudo)  </li>
                            <li>
                              Box Model, Colors, Fonts, Backgrounds 
                            </li>
                            <li>Positioning & Layout (Flexbox, Grid) </li>
                            <li>Responsive Design (Media Queries) </li>
                            <li>CSS Animations & Transitions  </li>
                          </ul>
                          <br />✅ Bootstrap / Tailwind CSS (Optional Framework) 
                          <ul>
                            <li>Grid System  </li>
                            <li>Ready-made UI Components (Navbar, Cards, Modals) </li>
                            <li>Responsive Utilities </li>
                          </ul>
                          <br />✅ JavaScript (Interactivity) 
                          <ul>
                            <li>Introduction to JavaScript </li>
                            <li>
                              Variables, Data Types, Operators 
                            </li>
                            <li>Functions, Arrays, Objects </li>
                            <li>DOM Manipulation (getElementById, querySelector)  </li>
                            <li>
                              Events (onclick, onsubmit)  
                            </li>
                            <li>ES6 Features (let/const, Arrow Functions, Template Literals)  </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                       3. Backend Development (Introduction) 
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          ✅ Introduction to Backend
                          <ul>
                            <li>What is a Server?  </li>
                            <li>Basics of REST APIs  </li>
                          </ul>
                          <br />✅ Node.js & Express.js (Optional)
                          <ul>
                            <li>Setting up Node.js Environment  </li>
                            <li>Creating a simple server with Express  </li>
                            <li>Routing in Express </li>
                            <li>Handling Forms and Data </li>
                          </ul>
                          <br />✅ Database (MySQL / MongoDB)
                          <ul>
                            <li> Introduction to Databases </li>
                            <li>Connecting Backend with Database  </li>
                            <li>Performing CRUD Operations </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                       4. Version Control (Git & GitHub)
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            ✅ Git Basics (init, add, commit, push, pull) <br />
                            ✅ Creating a GitHub Account & Hosting Code <br />
                            ✅ Collaborating with Teams (Branches & Pull Requests)
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                       5. Deployment & Hosting
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          <ul>
                            ✅ Hosting Static Sites (Netlify, Vercel, GitHub Pages) <br />
                            ✅ Hosting Dynamic Sites (Heroku or Render) <br />
                          </ul>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="5">
                    <Accordion.Header>
                       6. Hands-On Projects
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="module-card">
                        <Card.Body>
                          ✅  Mini Projects (Frontend) 
                          <ul>
                            <li>Personal Portfolio Website </li>
                            <li>Responsive Landing Page </li>
                            <li>To-Do List App (with Local Storage) </li>
                          </ul>
                          <br/>
                          ✅ Full Stack Project (Optional) 
                          <ul>
                            <li>Simple Blog App or E-commerce Website </li>
                            <li>User Authentication (Login & Registration) </li>
                            <li>API Integration </li>
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

export default WebDesign;
