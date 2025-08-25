import React, { useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Button, Col } from "react-bootstrap";
import { Row, Accordion, Card } from "react-bootstrap";
import "../../../assets/css/RHSNav.css";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/Python.css";
import { MdKeyboardBackspace } from "react-icons/md";
const MYSql = () => {
  const navigate = useNavigate();
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
                             <div className="pay-now-register">
                            <h3 className="section-heading">
                              📚 MySQL Training Program Outline{" "}
                              
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
                                  1. Introduction to Databases & MySQL
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>What is a Database? </li>
                                        <li>Why use MySQL? </li>
                                        <li>Features of MySQL </li>
                                        <li>
                                          Installing MySQL and Workbench (or phpMyAdmin){" "}
                                        </li>
                                        <li>
                                          Basic Database Terminology (Tables, Rows, Columns,
                                          Primary Keys){" "}
                                        </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="1">
                                <Accordion.Header>2. MySQL Basics </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Connecting to MySQL Server </li>
                                        <li>Creating and Selecting Databases </li>
                                        <li>Creating Tables </li>
                                        <li>
                                          Data Types in MySQL (INT, VARCHAR, DATE, TEXT,
                                          etc.){" "}
                                        </li>
                                        <li>
                                          Inserting, Updating, Deleting Records (CRUD
                                          Basics){" "}
                                        </li>
                                        <li>Retrieving Data with SELECT </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="2">
                                <Accordion.Header>
                                  {" "}
                                  3. Filtering and Sorting Data
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Using WHERE Clause </li>
                                        <li>
                                          Comparison Operators (=, &lt;, &gt;, BETWEEN,
                                          LIKE, IN)
                                        </li>
                                        <li>Logical Operators (AND, OR, NOT) </li>
                                        <li>Sorting Results (ORDER BY) </li>
                                        <li>Limiting Results (LIMIT) </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="3">
                                <Accordion.Header>4. Functions and Expressions</Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>String Functions (CONCAT, UPPER, LOWER, TRIM, SUBSTRING)  </li>
                                        <li>
                                          Numeric Functions (ROUND, CEIL, FLOOR, MOD) 
                                        </li>
                                        <li>Date and Time Functions (NOW, CURDATE, DATE_FORMAT)  </li>
                                        <li>Aggregate Functions (COUNT, SUM, AVG, MIN, MAX) </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="4">
                                <Accordion.Header> 5. Joins in MySQL</Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Understanding Relationships (One-to-One, One-to-Many, Many-to-Many) </li>
                                        <li>INNER JOIN  </li>
                                        <li>LEFT JOIN  </li>
                                        <li>RIGHT JOIN  </li>
                                        <li>CROSS JOIN   </li>
                                        <li>Self Joins  </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="5">
                                <Accordion.Header>
                                  6. Grouping Data
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Using GROUP BY  </li>
                                        <li>Filtering Groups with HAVING </li>
                                        <li>Combining GROUP BY and Aggregate Functions </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="6">
                                <Accordion.Header>7. Subqueries & Advanced Queries</Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Subqueries in SELECT, FROM, WHERE  </li>
                                        <li>
                                          EXISTS and NOT EXISTS 
                                        </li>
                                        <li>Correlated Subqueries  </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="7">
                                <Accordion.Header>8. Data Integrity & Constraints</Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Primary Keys & Foreign Keys </li>
                                        <li>NOT NULL, UNIQUE, AUTO_INCREMENT </li>
                                        <li>DEFAULT Values  </li>
                                        <li>ON DELETE / ON UPDATE Actions  </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="9">
                                <Accordion.Header>9. Database Design & Normalization</Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Introduction to Database Design  </li>
                                        <li>First, Second, Third Normal Forms (1NF, 2NF, 3NF) </li>
                                        <li>ER Diagrams (Entity Relationship Diagrams) </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="10">
                                <Accordion.Header>
                                  10. User Management & Security
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>Creating Users and Granting Privileges </li>
                                        <li>
                                          Managing Roles and Permissions 
                                        </li>
                                        <li>Backing up and Restoring Databases  </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="11">
                                <Accordion.Header>
                                  11. Advanced Topics
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        <li>
                                          Transactions (BEGIN, COMMIT, ROLLBACK) 
                                        </li>
                                        <li>Indexing for Optimization  </li>
                                        <li>
                                          Views (Creating and Managing Views) 
                                        </li>
                                        <li>Stored Procedures and Functions (Basics)   </li>
                                        <li>
                                          Triggers 
                                        </li>
                                      </ul>
                                    </Card.Body>
                                  </Card>
                                </Accordion.Body>
                              </Accordion.Item>
            
                              <Accordion.Item eventKey="12">
                                <Accordion.Header>
                                   12. Hands-On Projects 
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Card className="module-card">
                                    <Card.Body>
                                      <ul>
                                        
                                            <li>Build a Library Management Database  </li>
                                            <li>Create an E-commerce Database (Products, Orders, Customers)  </li>
                                            <li>Design a Student Result Management Database  </li>
                                        
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

export default MYSql;
