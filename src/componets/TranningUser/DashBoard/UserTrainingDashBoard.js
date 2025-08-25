import React, { useEffect, useState } from "react";
import RHSNav from "./RHSNav";
import TrainingNavBar from "../../user/top-navbar/TrainingNavBar";
import { Col, Spinner, Row, Card, Button } from "react-bootstrap";
import "../../../assets/css/RHSNav.css";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/Python.css";
import { fetchTrainingDetailsByEmail } from "../../../api/auth";
import {
  FaChalkboardTeacher,
  FaInfoCircle,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { MdOutlineContentPasteGo } from "react-icons/md";

const UserTrainingDashBoard = () => {
  const [TrainingOtpVerify, setTrainingOtpVerify] = useState(false);
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

  useEffect(() => {
    // Push the current page into history so user can't go back
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Disable back button by re-pushing the same page
      window.history.pushState(null, "", window.location.href);
    };

    // Use lowercase 'popstate'
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="center-spinner">
        <Spinner animation="border" role="status" />
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
    } else if (
      name.includes("html") ||
      name.includes("css") ||
      name.includes("bootstrap")
    ) {
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
    <div
      className={`dashboard-container d-flex ${
        isRHSClosed ? "rhs-closed" : ""
      }`}
    >
      {/* Main Content */}
      <div className="main-content-details-data flex-grow-1">
        <TrainingNavBar isRHSClosed={isRHSClosed} toggleRHSNav={toggleRHSNav} />

        <Row className="d-flex justify-content-end main-content-details ">
          <Col lg={10} sm={12} md={10} className="main-card-t">
            <div className="training-card-style">
              <h3 className="mb-3">Training DashBoard</h3>
               <Row className="theme-primary">
             <Col lg={3} sm={6} md={6} className="d-flex">
  <div className="box-traming bg-secondary-light pull-up t-dash-card flex-fill">
    <div className="box-body">
      <div className="flex-grow-1">
        <div className="d-flex align-items-center pe-2 justify-content-between">
          <div className="d-flex">
            <span class="badge badge-primary me-15">Active</span>
            <span className="badge badge-primary me-5">
               
              <i className="fa fa-lock"></i>
            </span>
            <span className="badge badge-primary">
              <i className="fa fa-clock-o"></i>
            </span>
          </div>
          <div className="dropdown">
            <Link
              to="#"
              data-bs-toggle="dropdown"
              href="#"
              className="px-10 pt-5"
            >
              <i className="ti-more-alt"></i>
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link to="#" className="dropdown-item" href="#">
                <i className="ti-import"></i> Import
              </Link>
              <Link to="#" className="dropdown-item" href="#">
                <i className="ti-export"></i> Export
              </Link>
              <Link to="#" className="dropdown-item" href="#">
                <i className="ti-printer"></i> Print
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="#" className="dropdown-item" href="#">
                <i className="ti-settings"></i> Settings
              </Link>
            </div>
          </div>
        </div>
        <h4 className="mt-25 mb-3">
          <FaChalkboardTeacher className="card-render-icon" />
           {trainingData[0]?.training_name || ""}
        </h4>
        <p className="text-fade text-color-me mb-0 fs-12">
          <FaInfoCircle className="card-render-icon" />
          {trainingData[0]?.training_duration || ""}
        </p>
        <p className="text-fade text-color-me mb-0 fs-12">
          <MdOutlineContentPasteGo className="card-render-icon" />
          {trainingData[0]?.training_description || ""}
        </p>
        <p className="text-fade mb-0 text-color-me fs-12">
          <FaCalendarAlt className="card-render-icon" />
          {trainingData[0]?.training_date || ""}
        </p>
        <span
          className="badge badge-read-more me-15 mt-3"
          style={{ cursor: "pointer" }}
          onClick={() =>
            handleViewMore((trainingData[0]?.training_name || "").toLowerCase())
          }
        >
          Read More
        </span>
      </div>
    </div>
  </div>
</Col>


              <Col lg={3} sm={6} md={6} className="d-flex">
                <div className="box-traming bg-secondary-light pull-up t-dash-card-st2 flex-fill">
                  <div class="box-body">
                    <div class="flex-grow-1">
                      <div class="d-flex align-items-center pe-2 justify-content-between">
                        <div class="d-flex">
                          <span class="badge badge-dark me-15">Finished</span>
                        </div>
                        <div class="dropdown">
                          <a
                            data-bs-toggle="dropdown"
                            href="#"
                            class="px-10 pt-5"
                          >
                            <i class="ti-more-alt"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#">
                              <i class="ti-import"></i> Import
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="ti-export"></i> Export
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="ti-printer"></i> Print
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                              <i class="ti-settings"></i> Settings
                            </a>
                          </div>
                        </div>
                      </div>
                      <h4 class="mt-25 mb-3">Programming</h4>
                      <p class="text-fade mb-0 fs-12">1 Days Left</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} sm={6} md={6} className="d-flex">
                <div className="box-traming bg-secondary-light pull-up t-dash-card-st3 flex-fill">
                  <div class="box-body">
                    <div class="flex-grow-1">
                      <div class="d-flex align-items-center pe-2 justify-content-between">
                        <div class="d-flex">
                          <span class="badge badge-primary me-15">Active</span>
                          <span class="badge badge-primary me-5">
                            <i class="fa fa-lock"></i>
                          </span>
                          <span class="badge badge-primary">
                            <i class="fa fa-clock-o"></i>
                          </span>
                        </div>
                        <div class="dropdown">
                          <Link
                            to="#"
                            data-bs-toggle="dropdown"
                            href="#"
                            class="px-10 pt-5"
                          >
                            <i class="ti-more-alt"></i>
                          </Link>
                          <div class="dropdown-menu dropdown-menu-end">
                            <Link to="#" class="dropdown-item" href="#">
                              <i class="ti-import"></i> Import
                            </Link>
                            <Link to="#" class="dropdown-item" href="#">
                              <i class="ti-export"></i> Export
                            </Link>
                            <Link to="#" class="dropdown-item" href="#">
                              <i class="ti-printer"></i> Print
                            </Link>
                            <div class="dropdown-divider"></div>
                            <Link to="#" class="dropdown-item" href="#">
                              <i class="ti-settings"></i> Settings
                            </Link>
                          </div>
                        </div>
                      </div>
                      <h4 class="mt-25 mb-3">It &amp; software</h4>
                      <p class="text-fade mb-0 fs-12">45 Days Left</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} sm={6} md={6}className="d-flex">
                <div className="box-traming bg-secondary-light pull-up t-dash-card-st4 flex-fill">
                  <div class="box-body">
                    <div class="flex-grow-1">
                      <div class="d-flex align-items-center pe-2 justify-content-between">
                        <div class="d-flex">
                          <span class="badge badge-warning-light me-15">
                            Paused
                          </span>
                          <span class="badge badge-warning-light me-5">
                            <i class="fa fa-lock"></i>
                          </span>
                        </div>
                        <div class="dropdown">
                          <a
                            data-bs-toggle="dropdown"
                            href="#"
                            class="px-10 pt-5"
                          >
                            <i class="ti-more-alt"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#">
                              <i class="ti-import"></i> Import
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="ti-export"></i> Export
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="ti-printer"></i> Print
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                              <i class="ti-settings"></i> Settings
                            </a>
                          </div>
                        </div>
                      </div>
                      <h4 class="mt-25 mb-3">Network Security</h4>
                      <p class="text-fade mb-0 fs-12">21 Days Left</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
              <Row>

                {/* Left Column (Training Cards) */}
              
              </Row>
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
