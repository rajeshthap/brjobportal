import React, { useState, useEffect } from "react";
import { Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import JobLogo from "../../../assets/images/job-logo.png";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";



function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [userName, setUserName] = useState("");
  const[photoUser,setPhotoUser]=useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("user_id");
  const userId = localStorage.getItem("user_id");

  // Fetch and auto-refresh user name
  useEffect(() => {
    let intervalId;

    const fetchUserName = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `${BASE_URLL}api/Registerduser/${userId}/`
          );
          //console.log("photoUser",response.data.photoUser);

          const {name,picture} = response.data;

          const capitalizedName = name
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

            const fullphotoURL= picture?.startswith("http")? picture
            : `${BASE_URLL}${picture}`;

          setUserName(capitalizedName);
          setPhotoUser(fullphotoURL);
          
        } catch (error) {
          console.error("Failed to fetch user name:", error);
        }
      }
    };

    if (isLoggedIn) {
      fetchUserName();
      intervalId = setInterval(fetchUserName, 5000);
    }

    return () => clearInterval(intervalId);
  }, [isLoggedIn, userId]);

  const handleLogout = () => {
    localStorage.clear();
    alert("Logout successfully");
    navigate("/");
    setExpanded(false);
  };

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <div className="nav-mg">
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
        className="nav-top-bg main-nav"
        sticky="top"
        fixed="top"
      >
        <div className="container-fluid">
          <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
            <img
              src={JobLogo}
              className="logo-img"
              alt="One Click Away From Your Dream Job!"
              title="BR JobsEdu!"
              style={{ cursor: "pointer" }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav-list gap-4 justify-content-end flex-grow-1 d-flex nav-down">
              {/* TRAINING DROPDOWN */}
              <NavDropdown title="Training" id="training-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to="/TrainingReact"
                  onClick={handleNavClick}
                >
                  React JS
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/TrainingPython"
                  onClick={handleNavClick}
                >
                  Python
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/TrainingPHP"
                  onClick={handleNavClick}
                >
                  PHP
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/TrainingMySql"
                  onClick={handleNavClick}
                >
                  MySQL
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/TrainingBootstrap"
                  onClick={handleNavClick}
                >
                  HTML/CSS/Bootstrap
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/TrainingWebDesign"
                  onClick={handleNavClick}
                >
                  Web Development
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/UIUXTraining"
                  onClick={handleNavClick}
                >
                  UI/UX Designer
                </NavDropdown.Item>
              </NavDropdown>

              {/* GROOMING CLASS */}
              <NavDropdown title="Grooming Class" id="grooming-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to="/Communication"
                  onClick={handleNavClick}
                >
                  Communication Skills
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/SelfConfidence"
                  onClick={handleNavClick}
                >
                  Self-Confidence & Power Dressing
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/InterviewSkill"
                  onClick={handleNavClick}
                >
                  Interview Skills
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/PublicSpeaking"
                  onClick={handleNavClick}
                >
                  Public Speaking
                </NavDropdown.Item>
              </NavDropdown>

              {/* STUDY MATERIAL */}
              <NavDropdown title="Study Material" id="study-material-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to="/PdfTutorial"
                  onClick={handleNavClick}
                >
                  PDF Tutorial
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/VideoTutorial"
                  onClick={handleNavClick}
                >
                  Video Tutorial
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/LiveClass"
                  onClick={handleNavClick}
                >
                  Live Class
                </NavDropdown.Item>
              </NavDropdown>

              {/* EVENTS */}
              <NavDropdown title="Event" id="event-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to="/Event"
                  onClick={handleNavClick}
                >
                  Upcoming Events
                </NavDropdown.Item>
              </NavDropdown>

              {/* BEFORE LOGIN */}
              {!isLoggedIn && (
                <>
                  <NavDropdown title="For Employers" id="employer-dropdown">
                    <NavDropdown.Item
                      as={Link}
                      to="/AdminLogin"
                      onClick={handleNavClick}
                    >
                      Employee Login
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/AdminRegistration"
                      onClick={handleNavClick}
                    >
                      Employee Registration
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link
                    as={Link}
                    to="/UserLogin"
                    onClick={handleNavClick}
                    className="btn btn-primary custom-nav-btn-login rounded-pill px-4"
                  >
                    User Login
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/UserRegistration"
                    onClick={handleNavClick}
                    className="btn btn-outline-primary rounded-pill custom-nav-btn px-4"
                  >
                    User Register
                  </Nav.Link>
                </>
              )}

              {/* AFTER LOGIN */}
              {isLoggedIn && (
                <>
                  <NavDropdown
                    title={
                      <span className="align-items-center">
                        <img src={photoUser || "/default-profile.png"}
                        alt="User"
                        width="30"
                        height="30"
                        className="rounded-circle me-2"/>
                        {userName || "UserProfile"}
                    
                      </span>
                    }
                      id="user-profile-dropdown"
                      
                    >
                    <NavDropdown.Item
                      as={Link}
                      to="/SavedJobsList"
                      onClick={handleNavClick}
                    >
                      Saved Job
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/UserProfile"
                      onClick={handleNavClick}
                    >
                      View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/UserDashboard"
                      onClick={handleNavClick}
                    >
                      JobPortal
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav></Nav>

                  {/* <Button variant="outline-light" className="ms-2" disabled>
                    {userName || "Loading..."}
                  </Button> */}
                </>
              )}
            </Nav>
          </Navbar.Collapse>












































































        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;
