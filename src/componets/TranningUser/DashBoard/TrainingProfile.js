import React, { useEffect, useState } from "react";
import {
  Card, Row, Col, Image, Spinner, Container, Button
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhone, FaUser, FaUserCircle } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { MdKeyboardBackspace } from "react-icons/md";
import { TbPhotoEdit } from "react-icons/tb";
import { fetchTrainingDetailsByEmail, fetchUserProfileById } from "../../../api/auth";
import "../../../assets/css/UserProfile.css";
import TrainingUpdateProfile from "./TrainingUpdateProfile";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import "../../../assets/css/TrainingProfile.css";

const TrainingProfile = () => {
  const userId = localStorage.getItem("user_id");
  const userEmail = localStorage.getItem("email_id");

  const [userData, setUserData] = useState(null);
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const getPhotoUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${BASE_URLL}${path}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await fetchUserProfileById(userId);
        setUserData(profile);
        console.log("User Profile:", profile);

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
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // If photo comes from userData
  const photoUrl = userData?.photo 
    ? (userData.photo.startsWith("http") 
        ? userData.photo 
        : `${BASE_URLL.replace(/\/$/, "")}/${userData.photo.replace(/^\//, "")}`
      )
    : null;

  // If it actually comes from trainingData, use:
  // const photoUrl = getPhotoUrl(trainingData?.photo);

  return (
    <Container>
      <Card className="p-4 shadow-lg rounded-4 mt-5 mb-5 my-profile">
        <Row className="mb-4">
          <Row>
            <Col md={1} sm={12}>
              <Button variant="" className="back-btn" onClick={() => navigate(-1)}>
                <MdKeyboardBackspace /> Back
              </Button>
            </Col>
            <Col md={11} sm={11} className="text-center">
              <h3>My Profile</h3>
            </Col>
          </Row>
        </Row>

        <Row>
          {/* User Info */}
          <Col md={4} className="user-profile-title mb-4">
            <div className="user-sub-title">
              <div className="position-relative d-inline-block">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    roundedCircle
                    width={160}
                    height={160}
                    alt="Profile"
                    style={{ objectFit: "cover", border: "6px solid #1a73e82f" }}
                  />
                ) : (
                  <FaUserCircle size={160} className="text-muted mb-3" />
                )}

                <Button
                  variant="primary"
                  className="position-absolute bottom-0 end-0 p-2 border edit-circle"
                  onClick={() => setShowEdit(true)}
                >
                  <TbPhotoEdit />
                </Button>
              </div>

              <h5 className="fw-bold mt-3">{userData?.name}</h5>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <p><FaEnvelope className="me-2" />{userData?.email}</p>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <p><FaPhone className="me-2" />{userData?.phone}</p>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <p><CgCalendarDates className="me-2" />{userData?.Date_of_Birth || "N/A"}</p>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <p><FaUser className="me-2" />{userData?.Gender || "N/A"}</p>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Training Info */}
        
        </Row>
      </Card>

      {showEdit && (
        <TrainingUpdateProfile
          show={showEdit}
          onHide={() => setShowEdit(false)}
          userData={userData}
          onUpdate={(updated) => setUserData(updated)}
        />
      )}
    </Container>
  );
};

export default TrainingProfile;
