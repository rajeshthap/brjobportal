import React, { useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Col } from "react-bootstrap";
import { Row, Accordion, Card } from "react-bootstrap";
import "../../../assets/css/RHSNav.css";
import { Link } from "react-router-dom";
import "../../../assets/css/Python.css";
const ReactTraining = () => {
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
                                  <h3 className="section-heading">📚 React Training Program </h3>
                                  <Accordion defaultActiveKey="0" flush alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header>1. Introduction to React</Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                          <ul>
                                            <li>What is React? </li>
                                            <li>Why React? (Benefits & Use Cases) </li>
                                            <li>Setting up React environment (Node.js, npm, create-react-app) </li>
                                          </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="1">
                                      <Accordion.Header>2. React Fundamentals </Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>Components: Functional vs Class Components </li>
                                              <li>JSX (JavaScript XML) </li>
                                              <li>Props and State </li>
                                              <li>Handling Events </li>
                                              <li>Conditional Rendering </li>
                                              <li>Lists and Keys </li>
                                            </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="2">
                                      <Accordion.Header> 3. React Hooks (Modern React)</Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>Introduction to Hooks </li>
                                              <li>useState, useEffect </li>
                                              <li>useRef, useContext, useReducer </li>
                                              <li>Custom Hooks </li>
                                            </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="3">
                                      <Accordion.Header>
                                       4. Routing in React
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>React Router basics </li>
                                              <li>Dynamic Routing </li>
                                              <li>Navigation & Redirects </li>
                                            </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="4">
                                      <Accordion.Header>
                                        5. Styling in React
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>CSS Modules </li>
                                              <li>Styled Components </li>
                                              <li>Tailwind CSS with React </li>
                                            </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="5">
                                      <Accordion.Header>
                                         6. Forms and Validation
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>Controlled vs Uncontrolled Components </li>
                                              <li>Form handling </li>
                                              <li>Validation with libraries (Formik/Yup) </li>
                                            </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="6">
                                      <Accordion.Header>
                                         7. State Management
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>Context API </li>
                                              <li>Redux Basics </li>
                                              <li>Redux Toolkit (Modern Redux) </li>
                                            </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="7">
                                      <Accordion.Header>
                                        8. API Integration
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>Fetching data with Fetch/Axios </li>
                                              <li>Async/Await and Promises </li>
                                              <li>Handling loading & error states </li>
                                            </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="9">
                                      <Accordion.Header>
                                        9. Advanced React Concepts
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>Lazy Loading & Code Splitting </li>
                                              <li>React.memo & useMemo for optimization </li>
                                              <li>Error Boundaries </li>
                                            </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="10">
                                      <Accordion.Header>
                                        10. Project Work (Hands-on)
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>Build a To-Do App / Blog App </li>
                                              <li>Integrate APIs (e.g., JSONPlaceholder or custom API) </li>
                                              <li>Deploy to Netlify/Vercel </li>
                                            </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="11">
                                      <Accordion.Header>
                                        11. Deployment
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>Preparing production builds </li>
                                              <li>Hosting React apps </li>
                                            </ul>
                                          </Card.Body>
                                        </Card>
                                      </Accordion.Body>
                                    </Accordion.Item>
                  
                                    <Accordion.Item eventKey="12">
                                      <Accordion.Header>
                                        12. Best Practices & Next Steps
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <Card className="module-card">
                                          <Card.Body>
                                            <ul>
                                              <li>Folder structure </li>
                                              <li>Reusable components </li>
                                              <li>Introduction to Next.js (Optional) </li>
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

export default ReactTraining;
