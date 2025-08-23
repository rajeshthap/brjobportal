import React, { useEffect, useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Col, Spinner, Row, Card, Button } from "react-bootstrap";
import "../../../assets/css/RHSNav.css";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/Python.css";
import { fetchTrainingDetailsByEmail } from "../../../api/auth";


const UserTrainingDashBoard = () => {
  const [isRHSClosed, setIsRHSClosed] = useState(false);
  const toggleRHSNav = () => setIsRHSClosed(!isRHSClosed);

  const userId = localStorage.getItem("user_id");
  const userEmail = localStorage.getItem("email_id");

  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const training = await fetchTrainingDetailsByEmail(userEmail);
        setTrainingData(Array.isArray(training) ? training : [training]);
        console.log("Training Data:", training);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, userEmail]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center spi-top mt-5">
        <Spinner animation="border"  className="spi-top"/>
      </div>
    );
  }

  // Handle View More click using switch-case
  // const handleViewMore = (trainingName) => {
  //   const name = trainingName.toLowerCase().trim();

  //   switch (name) {
  //     case "dashboard":
  //       navigate("/UserTrainingDashBoard");
  //       break;
  //     case "python":
  //       navigate("/Python");
  //       break;
  //     case "php":
  //       navigate("/PHP");
  //       break;
  //     case "react":
  //       navigate("/ReactTraining");
  //       break;
  //     case "html/css/bootsrap":
  //       navigate("/Bootstrap");
  //       break;
  //     case "web desgin":
  //       navigate("/WebDesign");
  //       break;
  //     case "ui/ux tranning":
  //       navigate("/UXTraining");
  //       break;
  //     case "my sql":
  //       navigate("/MYSql");
  //       break;
  //     case "communication":
  //       navigate("/CommunicationTraining");
  //       break;
  //     case "interviewskills":
  //       navigate("/InterView");
  //       break;
  //     case "self confidance":
  //       navigate("/Confidance");
  //       break;
  //     case "video tutorial":
  //       navigate("/VideoTraining");
  //       break;
  //     case "live tutorial":
  //       navigate("/LiveTraining");
  //       break;
  //     case "pdf tutorial":
  //       navigate("/PDFTraining");
  //       break;
  //     case "upcomming event":
  //       navigate("/UpcomingEvent");
  //       break;
  //     default:
  //       alert("No page configured for training: " + trainingName);
  //       break;
  //   }
  // };
const handleViewMore = (trainingName) => {
  const name = trainingName.toLowerCase().trim();

  if (name.includes("dashboard")) {
    navigate("/UserTrainingDashBoard");
  } else if (name.includes("python")) {
    navigate("/Python");
  } else if (name.includes("php")) {
    navigate("/PHP");
  } else if (name.includes("react")) {
    navigate("/ReactTraining");
  } else if (name.includes("html") || name.includes("css") || name.includes("bootstrap")) {
    navigate("/Bootstrap");
  } else if (name.includes("web")) {
    navigate("/WebDesign");
  } else if (name.includes("ui") || name.includes("ux")) {
    navigate("/UXTraining");
  } else if (name.includes("sql")) {
    navigate("/MYSql");
  } else if (name.includes("communication")) {
    navigate("/CommunicationTraining");
  } else if (name.includes("interview")) {
    navigate("/InterView");
  } else if (name.includes("confidance") || name.includes("confidence")) {
    navigate("/Confidance");
  } else if (name.includes("video")) {
    navigate("/VideoTraining");
  } else if (name.includes("live")) {
    navigate("/LiveTraining");
  } else if (name.includes("pdf")) {
    navigate("/PDFTraining");
  } else if (name.includes("event")) {
    navigate("/UpcomingEvent");
  } else {
    alert("Details not Found: " + trainingName);
  }
};

  return (
    <div className={`dashboard-container d-flex ${isRHSClosed ? "rhs-closed" : ""}`}>
      {/* Main Content */}
      <div className="main-content-details-data flex-grow-1">
        <TrainingNavBar isRHSClosed={isRHSClosed} toggleRHSNav={toggleRHSNav} />
        <Row className="d-flex justify-content-end main-content-details">
          <Col lg={10} sm={12} md={10}>
            <div className="dashboard-box p-3">
              <div className="main-contanier">
                <div className="my-3 main-mt-0">
                  <div className="training-wrapper-py p-4">
                    <Row>
                      {/* Left Column (Training Cards) */}
                      <Col md={8}>
                        <h5 className="fw-bold mb-3">Training Details</h5>
                        {trainingData && trainingData.length > 0 ? (
                          <Row>
                            {trainingData.map((training, index) => (
                              <Col md={12} sm={12} key={index}>
                                <Card className="p-3 mb-3 shadow-sm border-0 rounded-4 training-card">
                                  <p><strong>Training Name:</strong> {training.training_name}</p>
                                  <p><strong>Description:</strong> {training.training_description}</p>
                                  <p><strong>Applied Date:</strong> {training.training_date}</p>
                                  <p><strong>Duration:</strong> {training.training_duration}</p>
                                  <div className="text-end">
                                    <Button 
                                      variant="primary" 
                                      size="sm"
                                      onClick={() => handleViewMore(training.training_name)}
                                    >
                                      View More
                                    </Button>
                                  </div>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        ) : (
                          <p className="text-muted">No training details found.</p>
                        )}
                      </Col>
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

export default UserTrainingDashBoard;
