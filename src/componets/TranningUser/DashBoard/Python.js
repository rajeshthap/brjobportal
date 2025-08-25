import React, { useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Button, Col } from "react-bootstrap";
import { Row, Accordion, Card } from "react-bootstrap";
import "../../../assets/css/RHSNav.css";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/Python.css";
import { MdKeyboardBackspace } from "react-icons/md";
const Python = () => {
  const [isRHSClosed, setIsRHSClosed] = useState(false);
  const navigate = useNavigate();
  const toggleRHSNav = () => setIsRHSClosed(!isRHSClosed);
  const [shouldEnable, setShouldEnable] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.value.length > 0) {
      setShouldEnable(true);
    } else {
      setShouldEnable(false);
    }
  };
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
                      <div className="">
                        <Col md={12} sm={12} className="mb-4">
                          <Card>
                            <div className="pay-now-register">
                              <h3 className="section-heading">
                                📚 Python Training Program{" "}
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
                                  1. Introduction to Python
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>What is Python? </li>
                                        <li>
                                          Why Python? (Features & Use Cases){" "}
                                        </li>
                                        <li>
                                          Installing Python & Setting up IDE
                                          (PyCharm/VSCode){" "}
                                        </li>
                                        <li>
                                          Writing your first Python program
                                          (Hello World!){" "}
                                        </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                  2. Python Basics{" "}
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>
                                          Variables & Data Types (int, float,
                                          string, bool){" "}
                                        </li>
                                        <li>
                                          Operators (Arithmetic, Logical,
                                          Relational){" "}
                                        </li>
                                        <li>Input & Output </li>
                                        <li>Comments & Code Readability </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="2">
                                <Accordion.Header>
                                  {" "}
                                  3. Control Flow
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>If-Else Statements </li>
                                        <li>Loops (for, while) </li>
                                        <li>Break, Continue, Pass </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="3">
                                <Accordion.Header>
                                  4. Functions in Python
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Defining & Calling Functions </li>
                                        <li>
                                          Arguments (Positional, Keyword,
                                          Default, *args, **kwargs){" "}
                                        </li>
                                        <li>Lambda Functions </li>
                                        <li>Recursion </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="4">
                                <Accordion.Header>
                                  5. Data Structures
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>
                                          Lists, Tuples, Sets, Dictionaries{" "}
                                        </li>
                                        <li>List Comprehensions </li>
                                        <li>Working with Strings </li>
                                        <li>Common Methods & Operations </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="5">
                                <Accordion.Header>
                                  6. Object-Oriented Programming (OOP)
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Classes & Objects </li>
                                        <li>Constructors (__init__) </li>
                                        <li>Inheritance, Polymorphism </li>
                                        <li>Encapsulation </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="6">
                                <Accordion.Header>
                                  7. Modules and Packages
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Importing Modules </li>
                                        <li>
                                          Standard Library Overview (math,
                                          random, datetime, os, sys){" "}
                                        </li>
                                        <li>Creating Custom Modules </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="7">
                                <Accordion.Header>
                                  8. File Handling
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>
                                          Reading & Writing Files (Text & CSV){" "}
                                        </li>
                                        <li>Working with JSON files </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="9">
                                <Accordion.Header>
                                  9. Exception Handling
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Try, Except, Finally </li>
                                        <li>Custom Exceptions </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="10">
                                <Accordion.Header>
                                  10. Working with Libraries
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>NumPy (Basics of arrays) </li>
                                        <li>
                                          Pandas (DataFrames and basic data
                                          analysis){" "}
                                        </li>
                                        <li>Matplotlib (Simple plotting) </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="11">
                                <Accordion.Header>
                                  11. Python for Web & Automation (Optional
                                  Advanced Topics)
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>
                                          Introduction to Flask/Django (Web
                                          Frameworks){" "}
                                        </li>
                                        <li>
                                          Web Scraping with
                                          BeautifulSoup/Requests{" "}
                                        </li>
                                        <li>
                                          Automating tasks with Python (e.g.,
                                          Excel automation){" "}
                                        </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="12">
                                <Accordion.Header>
                                  12. Project Work (Hands-on)
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>
                                          Mini Projects:{" "}
                                          <ul>
                                            <li>Calculator App </li>
                                            <li>To-Do List (CLI based) </li>
                                            <li>Data Analysis on CSV </li>
                                            <li>
                                              Web Scraper (e.g., fetch job
                                              postings){" "}
                                            </li>
                                          </ul>
                                        </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>

                              <Accordion.Item eventKey="13">
                                <Accordion.Header>
                                  13. Deployment & Next Steps
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Running Python scripts </li>
                                        <li>
                                          Introduction to Virtual Environments{" "}
                                        </li>
                                        <li>Publishing on GitHub </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </Card>
                        </Col>
                        <Col md={1} sm={12}>
                          <Button
                            variant=""
                            className="back-btn"
                            onClick={() => navigate(-1)}
                          >
                            <MdKeyboardBackspace /> Back
                          </Button>
                        </Col>
                      </div>
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

export default Python;
