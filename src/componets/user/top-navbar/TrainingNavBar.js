import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import JobLogo from "../../../assets/images/job-logo.png";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";

function TrainingNavBar({ isRHSClosed, toggleRHSNav }) {
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("user_id");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    let intervalId;

    const fetchUserName = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${BASE_URLL}api/Registerduser/${userId}/`);
          const { name, photo } = response.data;

          if (!name || !photo) {
            localStorage.clear();
            navigate("/UserLogin");
            return;
          }

          const capitalizedName = name
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

          const fullPhotoURL = photo?.startsWith("http")
            ? photo
            : `${BASE_URLL.replace(/\/+$/, "")}/${photo.replace(/^\/+/, "")}`;

          setUserName(capitalizedName);
          setUserPhoto(fullPhotoURL);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (isLoggedIn) {
      fetchUserName();
      intervalId = setInterval(fetchUserName, 10000);
    }

    return () => clearInterval(intervalId);
  }, [isLoggedIn, userId, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("usertype");
    alert("Logout successfully");
    navigate("/");
    setExpanded(false);
  };

  const handleNavClick = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className="nav-top-bg main-nav"
      sticky="top"
      fixed="top"
    >
      <div className="container-fluid">
        <Navbar.Brand>
          <img src={JobLogo} className="logo-img" title="BR JobsEdu!" style={{ cursor: "pointer" }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-list gap-4 justify-content-end flex-grow-1 d-flex nav-down">
             <NavDropdown title="Training" id="training-dropdown">
      <NavDropdown.Item as={Link} to="/ReactTraining" onClick={handleNavClick}>
        React Training
      </NavDropdown.Item>
       <NavDropdown.Item as={Link} to="/Python" onClick={handleNavClick}>
        Python
      </NavDropdown.Item>
      
     
                     <NavDropdown.Item
                       as={Link}
                       to="/PHP"
                       onClick={handleNavClick}
                     >
                       PHP
                     </NavDropdown.Item>
                     <NavDropdown.Item
                       as={Link}
                       to="/MYSql"
                       onClick={handleNavClick}
                     >
                       MySQL
                     </NavDropdown.Item>
                     <NavDropdown.Item
                       as={Link}
                       to="/Bootstrap"
                       onClick={handleNavClick}
                     >
                       HTML/CSS/Bootstrap
                     </NavDropdown.Item>
                     <NavDropdown.Item
                       as={Link}
                       to="/WebDesign"
                       onClick={handleNavClick}
                     >
                       Web Development
                     </NavDropdown.Item>
                     <NavDropdown.Item
                       as={Link}
                       to="/UXTraining"
                       onClick={handleNavClick}
                     >
                       UI/UX Designer
                     </NavDropdown.Item>
    </NavDropdown>

    <NavDropdown title="Grooming Class" id="grooming-dropdown">
                    <NavDropdown.Item
                      as={Link}
                      to="/CommunicationTraining"
                      onClick={handleNavClick}
                    >
                      Communication Skills
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/Confidance"
                      onClick={handleNavClick}
                    >
                      Self-Confidence & Power Dressing
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/InterView"
                      onClick={handleNavClick}
                    >
                      Interview Skills
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/PublicSpeakingTraining"
                      onClick={handleNavClick}
                    >
                      Public Speaking
                    </NavDropdown.Item>
                  </NavDropdown>
      
                    {/* Study Material */}
                    <NavDropdown title="Study Material" id="study-material-dropdown">
                      <NavDropdown.Item
                        as={Link}
                        to="/PDFTraining"
                        onClick={handleNavClick}
                      >
                        PDF Tutorial
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/UXTraining"
                        onClick={handleNavClick}
                      >
                        Video Tutorial
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/LiveTraining"
                        onClick={handleNavClick}
                      >
                        Live Class
                      </NavDropdown.Item>
                    </NavDropdown>
      
                    {/* Events */}
                    <NavDropdown title="Event" id="event-dropdown">
                      <NavDropdown.Item
                        as={Link}
                        to="/UpcomingEvent"
                        onClick={handleNavClick}
                      >
                        Upcoming Events
                      </NavDropdown.Item>
                    </NavDropdown>

            {!isLoggedIn && (
              <>
                <NavDropdown title="For Employers" id="employer-dropdown">
                  <NavDropdown.Item as={Link} to="/AdminLogin" onClick={handleNavClick}>Employee Login</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/AdminRegistration" onClick={handleNavClick}>Employee Registration</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={Link} to="/UserLogin" onClick={handleNavClick} className="btn btn-primary custom-nav-btn-login rounded-pill px-4">User Login</Nav.Link>
                <Nav.Link as={Link} to="/UserRegistration" onClick={handleNavClick} className="btn btn-outline-primary rounded-pill custom-nav-btn px-4">User Register</Nav.Link>
              </>
            )}

            {isLoggedIn && (
              <NavDropdown
                className="d-flex"
                title={
                  loading ? (
                    <span className="align-items-center">
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Loading...
                    </span>
                  ) : (
                    <span className="align-items-center">
                     
                      {userName || "UserProfile"}
                       <img src={userPhoto || "/default-profile.png"} alt="User" width="30" height="30" className="rounded-circle img-ml me-2" />
                    </span>
                  )
                }
                id="user-profile-dropdown"
              >
                 <NavDropdown.Item
                        as={Link}
                        to="/UserTrainingDashBoard"
                        onClick={handleNavClick}
                      >
                        DashBoard
                      </NavDropdown.Item>
                       <NavDropdown.Item
                        as={Link}
                        to="/TrainingProfile"
                        onClick={handleNavClick}
                      >
                        View Profile
                      </NavDropdown.Item>
                {!loading && <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>}
              </NavDropdown>

            )}

            {/* Toggle RHS Nav button */}
       


          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default TrainingNavBar;
