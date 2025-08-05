import React, { useState, useEffect } from "react";
import {
  Card,
  Spinner,
  Container,
  Row,
  Col,
  Alert,
  Form,
  Button,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaStar,
  FaBookmark,
  FaRupeeSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/css/PostJobCard.css";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";

const PostJobCard = ({ jobs }) => {
  const navigate = useNavigate();

  const accessToken11 = localStorage.getItem("access_token1");

  const [searchFields, setSearchFields] = useState({
    title: "",
    location: "",
    experience: "",
  });

  const [savedJobs, setSavedJobs] = useState([]);
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (!jobs) return;

    const title = searchFields.title.toLowerCase().trim();
    const location = searchFields.location.toLowerCase().trim();
    const experience = searchFields.experience.trim();

    let minExp = null;
    let maxExp = null;

    if (experience.includes("-")) {
      const parts = experience.split("-");
      if (parts.length === 2) {
        minExp = parseInt(parts[0].trim(), 10);
        maxExp = parseInt(parts[1].trim(), 10);
      }
    } else if (experience) {
      const singleExp = parseInt(experience.trim(), 10);
      minExp = singleExp;
      maxExp = singleExp;
    }

    const filtered = jobs.filter((job) => {
      const jobTitle = job.job_title?.toLowerCase() || "";
      const jobLocation = job.location?.toLowerCase() || "";
      const jobMinExp = parseInt(job.Min_work_experience || 0);
      const jobMaxExp = parseInt(job.Max_work_experience || 100);

      const matchTitle = !title || jobTitle.includes(title);
      const matchLocation = !location || jobLocation.includes(location);
      const matchExperience =
        minExp === null ||
        maxExp === null ||
        (jobMaxExp >= minExp && jobMinExp <= maxExp);

      return matchTitle && matchLocation && matchExperience;
    });

    setFilteredJobs(filtered);
  }, [searchFields, jobs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFields((prev) => ({ ...prev, [name]: value }));
  };

  const getDaysAgoText = (dateStr) => {
    const postDate = new Date(dateStr);
    const currentDate = new Date();
    const diffTime = currentDate - postDate;
    const daysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return daysAgo === 0 ? "Posted today" : `${daysAgo} Days Ago`;
  };
  const handleApplyJob=(job)=>{
   const jobId = job.job_id || job.Job_id;
  const employeeId = job.employee_id || job.Employee_id;

  // Save IDs to localStorage
  localStorage.setItem("selected_job_id", jobId);
  localStorage.setItem("selected_employee_id", employeeId);
  
  // Navigate to job details page
  navigate("/JobDetails", {
    state: {
      job,
      job_id: jobId,
      employee_id: employeeId,
    },
  });
  };

 const handleReadMore = (job) => {
  const jobId = job.job_id || job.Job_id;
  const employeeId = job.employee_id || job.Employee_id;

  // Save IDs to localStorage
  localStorage.setItem("selected_job_id", jobId);
  localStorage.setItem("selected_employee_id", employeeId);
  // Navigate to job details page
  navigate("/JobDetails", {
    state: {
      job,
      job_id: jobId,
      employee_id: employeeId,
    },
  });
};


   
  const handleSaveJob = async (job) => {
    const userId = localStorage.getItem("user_id");

    if (!userId || !job || !job.id) {
      setAlertMsg("User not logged in or job details missing.");
      setAlertVariant("danger");
      return;
    }

    if (savedJobs.includes(job.id)) {
      setAlertMsg("This job has already been saved.");
      setAlertVariant("warning");
      return;
    }

    const payload = {
      user: userId,
      job_id: job.job_id || job.id,
      job_title: job.job_title || "Untitled Job",
      sub_title: job.sub_title || "No subtitle",
      key_skills: "dummy skill",
      comment: "Saved by user",
      location: job.location || "Not specified",
      experience: `${job.Min_work_experience || 0} - ${
        job.Max_work_experience || 0
      }`,
      salary: `${job.Min_salary || 0} - ${job.Max_salary || "Not disclosed"}`,
      work_mode: job.work_mode || "Not specified",
      education: job.education || "Not specified",
      company_name: job.company_name || "Unnamed Company",
    };

    try {
      await axios.post(`${BASE_URLL}api/Saved-post_by_user/`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken11}`,
        },
      });
      setSavedJobs((prev) => [...prev, job.id]);
      setAlertMsg("Job saved successfully.");
      setAlertVariant("success");
    } catch (error) {
      console.error("Error saving job:", error.response?.data || error.message);
      setAlertMsg("Failed to save the job.");
      setAlertVariant("danger");
    }
  };

  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => setAlertMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  if (!jobs) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container fluid className=" dash-board-card">
      <Form className="mb-4 bg-light rounded shadow-sm ">
        <Row className="adv-job-search">
          <Col md={4} sm={12}>
            <Form.Control
              type="text"
              placeholder="Search by Job Title"
              name="title"
              value={searchFields.title}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Col>
          <Col md={4} sm={12}>
            <Form.Control
              type="text"
              placeholder="Search by Location"
              name="location"
              value={searchFields.location}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Col>
          <Col md={4} sm={12} className="">
            <Form.Control
              type="text"
              placeholder="Experience (e.g. 0 - 2 or 2)"
              name="experience"
              value={searchFields.experience}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Col>
        </Row>
      </Form>

      {alertMsg && (
        <Alert variant={alertVariant} className="text-center">
          {alertMsg}
        </Alert>
      )}

      {filteredJobs.length === 0 ? (
        <Alert variant="warning" className="text-center mt-4">
          No jobs found for your search.
        </Alert>
      ) : (
        <Row>
          {filteredJobs.map((job, index) => (
            <Col md={12} key={index} className="mb-2 p-0">
              <Card className="job-card p-3 shadow-sm ">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="mb-1">{job.job_title}</h5>
                    <div className="text-muted fw-medium">
                      {job.company_name}
                    </div>
                    <div className="text-warning mt-1">
                      <FaStar className="me-1" /> 3.5 | 7 Reviews
                    </div>
                  </div>
                  <div>
                    <div
                      className="  text-black d-flex justify-content-center align-items-center"
                     
                    >
                   <strong>
  {job.company_name
    ? `${job.company_name} (${job.company_name
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase())
        .join("")})`
    : "Company Name (NA)"}
</strong>

                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 text-muted mt-3 mb-2">
                  <span>
                    <FaBriefcase className="me-1" />
                    {job.Min_work_experience} - {job.Max_work_experience} Yrs
                  </span>
                  <span>
                    <FaRupeeSign className="me-1" />
                    {job.Min_salary} - {job.Max_salary || "Not disclosed"}
                  </span>
                  <span>
                    <FaMapMarkerAlt className="me-1" />
                    {job.location}
                  </span>
                </div>

                <p className="text-truncate mb-2">
                  {job.job_description || "No description provided"}
                </p>

                <div className="d-flex flex-wrap mb-2">
                  {job.sub_title?.split(",").map((item, i) => (
                    <span
                      key={i}
                      className="badge bg-light text-primary border me-2 mb-1"
                    >
                      {item.trim()}
                    </span>
                  ))}
                  {job.key_skills?.split(",").map((item, i) => (
                    <span
                      key={i}
                      className="badge bg-light text-primary border me-2 mb-1"
                    >
                      {item.trim()}
                    </span>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">{getDaysAgoText(job.date)}</span>
                  <div className="d-flex align-items-center gap-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="rounded-pill"
                      onClick={() => handleSaveJob(job)}
                      disabled={savedJobs.includes(job.id)}
                    >
                      {savedJobs.includes(job.id) ? "Saved" : "Save"}
                    </Button>
                    {/* <FaBookmark style={{ cursor: "pointer" }} /> */}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="rounded-pill"
                      onClick={() => handleReadMore(job)}
                    >
                      Read More
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="rounded-pill"
                      onClick={() => handleApplyJob(job)}
                    >
                      Apply
                    </Button>
    
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PostJobCard;
