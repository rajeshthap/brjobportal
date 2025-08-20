import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Spinner,
  Container,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBirthdayCake,
  FaEnvelope,
  FaLinkedinIn,
  FaPhone,
  FaUser,
  FaUserCircle,
  FaVenusMars,
} from "react-icons/fa";
import {
  fetchResumeWithUserDetails,
  fetchUserProfileById,
} from "../../../api/auth";
import EditProfilePopup from "../../../componets/user/UserPages/UserSetProfile";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import { CgCalendarDates } from "react-icons/cg";
import { MdKeyboardBackspace } from "react-icons/md";
import { TbPhotoEdit } from "react-icons/tb";
import { HiOutlineDownload } from "react-icons/hi";
import { RiFileEditLine } from "react-icons/ri";
import "../../../assets/css/UserProfile.css";

const UserProfile = () => {
  const userId = localStorage.getItem("user_id");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!userId) throw new Error("User ID not found in localStorage");

        const resumeData = await fetchResumeWithUserDetails(userId);
         
        const userBasic = await fetchUserProfileById(userId);
    let resumeUrl = resumeData.generated_pdf;

if (resumeUrl) {
  if (!/^https?:\/\//i.test(resumeUrl)) {
    // Safely join base and path without creating double slashes
    const base = BASE_URLL.replace(/\/+$/, "");
    const path = resumeUrl.replace(/^\/+/, "");
    resumeUrl = `${base}/${path}`;
  }

  // Now fix ONLY the part after protocol, collapsing any accidental slashes
  resumeUrl = resumeUrl.replace(/^(https?:\/\/)(.*)$/, (match, protocol, rest) => {
    return protocol + rest.replace(/\/{2,}/g, "/");
  });
}


        let photoURL = userBasic.photo;
if (photoURL && !photoURL.startsWith("http")) {
 
  const normalizedPath = photoURL.replace(/^\/+/, "");
  
  const normalizedBase = BASE_URLL.replace(/\/+$/, "");
  photoURL = `${normalizedBase}/${normalizedPath}`;
}

        const mergedData = {
          ...resumeData,
          full_name: userBasic.name,
          email: userBasic.email,
          phone: userBasic.phone,
          Gender: userBasic.Gender,
          Date_of_Birth: userBasic.Date_of_Birth,
          
          photo: photoURL,
          generated_pdf: resumeUrl,
        };

        setUserData(mergedData);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        alert("Your Profile not Complete Pleasce first create your resume.");
        navigate('/Profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleUpdate = (updatedUser) => {
    let updatedPhoto = updatedUser.photo;
    if (updatedPhoto && !updatedPhoto.startsWith("http")) {
      updatedPhoto = `${BASE_URLL}${
        updatedPhoto.startsWith("/") ? "" : "/"
      }${updatedPhoto}`;
    }

    setUserData((prev) => ({
      ...prev,
      full_name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      Gender: updatedUser.Gender,
      Date_of_Birth: updatedUser.Date_of_Birth,
      photo: updatedPhoto || prev.photo,
    }));
  };

  const renderField = (label, value) => {
    if (!value || value.trim() === "") return null;
    return (
      <Row key={label}>
        <Col sm={4}>
          <strong>{label}:</strong>
        </Col>
        <Col sm={8}>
          <span>{value}</span>
        </Col>
      </Row>
    );
  };

  const renderEducation = (label, detail) => {
    if (!detail) return null;

    // Define known college-level qualifications
    const collegeQualifications = [
      "Graduation",
      "Post Graduation",
      "PhD",
      "B.Tech",
      "BCA",
      "B.Sc",
      "B.Com",
      "BA",
      "M.Tech",
      "MBA",
      "MCA",
      "MA",
      "M.Sc",
      "LLB",
      "LLM",
      "M.Phil",
      "MArch",
      "B.Arch",
      "M.Plan",
    ];

    // Normalize for comparison
    const qualification = detail.qualification?.trim().toLowerCase() || "";

    const isCollege = collegeQualifications.some((q) =>
      qualification.includes(q.toLowerCase())
    );

    return (
      <div className="mb-3" key={label}>
        <h6 className="text-secondary">{label}</h6>
        <Row>
          <Col sm={4}>
            <strong>{isCollege ? "College:" : "School:"}</strong>
          </Col>
          <Col sm={8}>{detail.school || detail.qualification}</Col>
        </Row>
        <Row>
          <Col sm={4}>
            <strong>Board/University:</strong>
          </Col>
          <Col sm={8}>{detail.board || "N/A"}</Col>
        </Row>
        <Row>
          <Col sm={4}>
            <strong>Year:</strong>
          </Col>
          <Col sm={8}>{detail.year || "N/A"}</Col>
        </Row>
        <Row>
          <Col sm={4}>
            <strong>Marks:</strong>
          </Col>
          <Col sm={8}>{detail.marks || "N/A"}%</Col>
        </Row>
      </div>
    );
  };

  const hasValidData = (section) =>
    section && Object.values(section).some((val) => val && val !== "N/A");

  if (loading) {
    return (
      <div className="text-center loading-text">
        <Spinner animation="border" variant="primary" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center text-danger mt-4">
        No profile data found. <Link to="/Profile">Create your profile</Link>
      </div>
    );
  }

  return (
    <Container>
      <Card className="p-4 shadow-lg rounded-4 mt-5 mb-5 my-profile">
        <Row className="mb-4">
          <Row>
            <Col md={1} sm={12}>
              <Button
                variant=""
                className="back-btn"
                onClick={() => navigate(-1)}
              >
                <MdKeyboardBackspace /> Back
              </Button>
            </Col>
            <Col md={11} sm={11} className="text-center">
              {" "}
              <h3>My Profile</h3>
            </Col>
          </Row>
        </Row>

        <Row>
          <Col md={4} className="user-profile-title mb-4">
            <div className="user-sub-title">
              <div className="position-relative d-inline-block">
                {userData.photo ? (
                  <Image
                    src={userData.photo}
                    roundedCircle
                    width={160}
                    height={160}
                    alt="Profile"
                    style={{
                      objectFit: "cover",
                      border: "6px solid #1a73e82f",
                    }}
                  />
                ) : (
                  <FaUserCircle size={160} className="text-muted mb-3" />
                )}

                <Button
                  variant="primary"
                  className="position-absolute bottom-0 end-0 p-2 border  edit-circle"
                  // style={{ backgroundColor: "#0d95e1" }}

                  onClick={() => setShowEdit(true)}
                >
                  <TbPhotoEdit />
                </Button>
              </div>

              <h5 className="fw-bold mt-3">{userData.full_name}</h5>
         <Row>
                <Col lg={6} md={6} sm={12}>
              <p className="">
                <FaEnvelope className="me-2" />
                {userData.email}
              </p>
              </Col>
              <Col lg={6} md={6} sm={12}>
              <p>
                <FaPhone className="me-2" />
                {userData.phone}
              </p>
              </Col>
              <Col lg={6} md={6} sm={12}>
              <p>
                <CgCalendarDates className="me-2" />
                {userData.Date_of_Birth}
              </p>
              </Col>
                 <Col lg={6} md={6} sm={12}>
              <p>
                <FaUser className="me-2" />
                {userData.Gender}
              </p>
              </Col>
   <Col lg={6} md={6} sm={12}>
              {userData.Linked_url && (
                <a
                  href={userData.Linked_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-info btn-sm mt-2"
                >
                  <FaLinkedinIn className="me-2" /> LinkedIn
                </a>
              )}
              </Col>
               </Row>
            </div>
          
          </Col>
          
          <Col md={8}>
            <div className="user-edit-row align-items-center mb-4">
              {userData.generated_pdf ? (
                <Button
                  href={userData.generated_pdf}
                  className="edit-p-btn px-4 me-2"
                  target="_blank"
                  variant=""
                  rel="noopener noreferrer"
                  download
                >
                  <HiOutlineDownload />
                  Download Resume
                </Button>
              ) : (
                <span className="text-muted">No resume uploaded</span>
              )}
              <Button
                  className="edit-r-btn px-4 "
                variant=""
                onClick={() => navigate("/ViewProfile")}
              >
                <span className="profile-icon">
                  {" "}
                  <RiFileEditLine />
                </span>
                Edit Resume
              </Button>
            </div>
            <section className="mb-4 edu-datials">
              <div className="bg-primary-subtle p-2 border-dashed border-primary rounded mb-1">
                <h5>Personal Information</h5>
              </div>
              <div className="edu-data border-dashed">
                {renderField("Address Line 1", userData.adress1)}
                {renderField("Address Line 2", userData.adress2)}
                {renderField("Country", userData.Country)}

                {renderField("City", userData.city)}
                {renderField("State", userData.state)}
                {renderField("Zip Code", userData.zip_code)}
                {renderField("Objective", userData.objetive)}
                {renderField("Skills", userData.skills)}
                {renderField("Languages", userData.languages)}
                {renderField("Hobbies", userData.Hobbies)}
                {userData.Full_time &&
                  userData.Full_time.trim() !== "" &&
                  renderField("Full Time", userData.Full_time)}

                {userData?.Distance_learning?.trim() !== "" &&
                  renderField("Distance Learning", userData.Distance_learning)}

                {renderField(
                  "Professional Experience",
                  userData.Proffesional_experience
                )}
              </div>
            </section>
            <section className="mb-4 edu-datials">
              <div className="bg-primary-subtle p-2 border-dashed border-primary rounded mb-1">
                <h5>Education</h5>
              </div>
              <div className="edu-data border-dashed">
                {hasValidData(userData.Tenth_Details) &&
                  renderEducation("10th Details", userData.Tenth_Details)}
                {hasValidData(userData.Twelth_Details) &&
                  renderEducation("12th Details", userData.Twelth_Details)}
                {hasValidData(userData.Diploma_Details) &&
                  renderEducation("Diploma", userData.Diploma_Details)}
                {hasValidData(userData.Graduation_Details) &&
                  renderEducation("Graduation", userData.Graduation_Details)}
                {hasValidData(userData.Masters_Details) &&
                  renderEducation("Masters", userData.Masters_Details)}
              </div>
            </section>
          </Col>
        </Row>
      </Card>

      <EditProfilePopup
        show={showEdit}
        onHide={() => setShowEdit(false)}
        userData={userData}
        onUpdate={handleUpdate}
      />
    </Container>
  );
};

export default UserProfile;
