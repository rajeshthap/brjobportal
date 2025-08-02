import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaRupeeSign,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import {
  fetchUserProfileById,
  fetchResumeWithUserDetails,
} from "../../../api/auth";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";

const BASE_URL = "https://adminnanda.in";

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  const [userData, setUserData] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log(" Fetching user and resume data...");
        const userId = localStorage.getItem("user_id");

        if (!userId) {
          console.warn(" No user_id in localStorage, redirecting...");
          navigate("/UserLogin");
          return;
        }

        const profile = await fetchUserProfileById(userId);
        console.log(" Fetched profile:", profile);

        const resume = await fetchResumeWithUserDetails();
        console.log(" Fetched resume data:", resume);

        setUserData(profile);
        setResumeData(resume);
      } catch (error) {
        console.error(" Error loading profile/resume:", error);
        setApplyError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

const handleApplyJob = async () => {
  setIsApplying(true);
  setApplyError("");

  const accessToken11 = localStorage.getItem("access_token1");
  const employeeId = localStorage.getItem("selected_employee_id");
  const jobId = localStorage.getItem("selected_job_id");
  const user_id = localStorage.getItem("user_id");

  console.log("🧾 Apply job called:");
  console.log("employeeId:", employeeId);
  console.log("jobId:", jobId);
  console.log("user_id:", user_id);
  console.log("resumeData:", resumeData);

  try {
    const formData = new FormData();

    if (!resumeData?.generated_pdf) {
      throw new Error("Resume path is missing.");
    }

  
  const resumeURL = resumeData.generated_pdf.includes("http")
  ? resumeData.generated_pdf
  : `${BASE_URLL}${resumeData.generated_pdf}`;

console.log("Final resume URL:", resumeURL);

    const resumeResponse = await fetch(resumeURL);
    if (!resumeResponse.ok) {
      throw new Error("Resume file not found.");
    }

    const resumeBlob = await resumeResponse.blob();
    const resumeFile = new File([resumeBlob], "resume.pdf", {
      type: "application/pdf",
    });

    formData.append("employee", employeeId);
    formData.append("job_id", jobId);
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("resume", resumeFile);
    formData.append("job_title", job.job_title);
    formData.append("company_name", job.company_name);
    formData.append("user", user_id);

    console.log(" Submitting formData...");

    const response = await axios.post(
      `${BASE_URL}/Job/api3/ApplyJob/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken11}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(" Server response:", response.status, response.data);

    if (response.status === 200 || response.status === 201) {
      setApplySuccess(true);
    } else {
      setApplyError("Failed to apply for the job.");
    }
  } catch (error) {
    console.error(" Apply job error:", error);

    if (error.response) {
      console.log("🧾 Full error response:", error.response.data);
      const errorMsg =
        error.response.data?.error ||
        error.response.data?.message ||
        error.response.data?.detail ||
        JSON.stringify(error.response.data) ||
        "Something went wrong. Please try again.";
      setApplyError(errorMsg);
    } else if (error.request) {
      setApplyError("No response from server. Please check your network.");
    } else {
      setApplyError(error.message);
    }
  } finally {
    setIsApplying(false);
  }
};



  if (!job) {
    return <p className="text-center mt-5">No job details found.</p>;
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading job & profile...</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Button
        variant="outline-secondary"
        className="mb-3"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-1" />
        Back
      </Button>

      {applySuccess && (
        <Alert variant="success" className="d-flex align-items-center gap-2">
          <FaCheckCircle className="text-success" />
          You have successfully applied for this job!
        </Alert>
      )}

      {applyError && <Alert variant="danger">{applyError}</Alert>}

      <Card className="p-4 shadow-sm mb-4">
        <h3>{job.job_title}</h3>
        <h5 className="text-muted">
          {job.company_name} (
          {job.company_name
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("")}
          )
        </h5>

        <Row className="mt-3 mb-2 text-muted">
          <Col md={4}>
            <FaBriefcase className="me-1" />
            {job.Min_work_experience} - {job.Max_work_experience} Yrs
          </Col>
          <Col md={4}>
            <FaRupeeSign className="me-1" />
            {job.Min_salary} - {job.Max_salary || "Not disclosed"}
          </Col>
          <Col md={4}>
            <FaMapMarkerAlt className="me-1" />
            {job.location}
          </Col>
        </Row>

        <hr />

        <h5>Description</h5>
        <p>{job.job_description || "No description available."}</p>

        <h5>Sub Titles</h5>
        <div className="mb-3">
          {job.sub_title?.split(",").map((item, i) => (
            <Badge key={i} bg="light" text="dark" className="me-2 mb-2 border">
              {item.trim()}
            </Badge>
          ))}
        </div>

        <h5>Key Skills</h5>
        <div className="mb-3">
          {job.key_skills?.split(",").map((item, i) => (
            <Badge key={i} bg="light" text="dark" className="me-2 mb-2 border">
              {item.trim()}
            </Badge>
          ))}
        </div>

        <h6 className="text-muted mt-4">
          Posted on: {new Date(job.date).toLocaleDateString()}
        </h6>

        <div className="text-end">
           <Button
  variant="outline-secondary"
  onClick={() => navigate(-1)}
  style={{ marginRight: "18px" }}
>
  <FaArrowLeft className="me-1" />
  Back
</Button>

          <Button
            variant="success"
            onClick={handleApplyJob}
            disabled={applySuccess || isApplying}
          >
            {isApplying
              ? "Applying..."
              : applySuccess
              ? "Already Applied"
              : "Apply Now"}
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default JobDetails;
