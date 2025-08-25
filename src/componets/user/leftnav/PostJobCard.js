import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Alert,
  Form,
  Button,
  Modal,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaRupeeSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/PostJobCard.css";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import { getJobSuggestions } from "../../../api/auth";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import JobListWithPagination from "./JobListWithPagination";
import AccessRefreshToken from "../Employee/AccessRefreshToken"; // Import the interceptor


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
  const [showModal, setShowModal] = useState(false);
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
const [selectedFilters, setSelectedFilters] = useState({
  location: "", // e.g., "Delhi"
  mode: "", // e.g., "Hybrid"
});

  const isMobile = () => window.innerWidth <= 767;

  // useEffect(() => {
  //   if (!jobs || jobs.length === 0) {
  //     setLoading(false);
  //     return;
  //   }

    
  //   const storedTitle =
  //     localStorage.getItem("job_title")?.toLowerCase().trim() || "";
  //   const storedLocation =
  //     localStorage.getItem("job_location")?.toLowerCase().trim() || "";
  //   const storedExperience =
  //     localStorage.getItem("job_experience")?.trim() || "";

  //   let minExp = null;
  //   let maxExp = null;

  //   if (storedExperience.includes("-")) {
  //     const [min, max] = storedExperience
  //       .split("-")
  //       .map((part) => parseInt(part.trim(), 10));
  //     minExp = isNaN(min) ? null : min;
  //     maxExp = isNaN(max) ? null : max;
  //   } else if (storedExperience) {
  //     const exp = parseInt(storedExperience, 10);
  //     minExp = isNaN(exp) ? null : exp;
  //     maxExp = isNaN(exp) ? null : exp;
  //   }

  //   const filtered = jobs.filter((job) => {
  //     const jobTitle = job.job_title?.toLowerCase() || "";
  //     const jobLocation = job.location?.toLowerCase() || "";
  //     const jobMinExp = parseInt(job.Min_work_experience || 0);
  //     const jobMaxExp = parseInt(job.Max_work_experience || 100);

  //     const matchTitle = !storedTitle || jobTitle.includes(storedTitle);
  //     const matchLocation =
  //       !storedLocation || jobLocation.includes(storedLocation);
  //     const matchExperience =
  //       minExp === null ||
  //       maxExp === null ||
  //       (jobMaxExp >= minExp && jobMinExp <= maxExp);

  //     return matchTitle && matchLocation && matchExperience;
  //   });

  //   setFilteredJobs(filtered);
  //   setLoading(false);
  // }, [jobs]);




  useEffect(() => {
  if (!jobs || jobs.length === 0) {
    setLoading(false);
    return;
  }

  const storedTitle =
    localStorage.getItem("job_title")?.toLowerCase().trim() || "";
  const storedLocation =
    localStorage.getItem("job_location")?.toLowerCase().trim() || "";
  const storedExperience =
    localStorage.getItem("job_experience")?.trim() || "";

  let minExp = null;
  let maxExp = null;

  if (storedExperience.includes("-")) {
    const [min, max] = storedExperience
      .split("-")
      .map((part) => parseInt(part.trim(), 10));
    minExp = isNaN(min) ? null : min;
    maxExp = isNaN(max) ? null : max;
  } else if (storedExperience) {
    const exp = parseInt(storedExperience, 10);
    minExp = isNaN(exp) ? null : exp;
    maxExp = isNaN(exp) ? null : exp;
  }

  const filtered = jobs.filter((job) => {
    const jobTitle = job.job_title?.toLowerCase() || "";
    const jobLocation = job.location?.toLowerCase() || "";
    const jobMinExp = parseInt(job.Min_work_experience || 0);
    const jobMaxExp = parseInt(job.Max_work_experience || 100);

    const matchTitle = !storedTitle || jobTitle.includes(storedTitle);
    const matchLocation =
      !storedLocation || jobLocation.includes(storedLocation);
    const matchExperience =
      minExp === null ||
      maxExp === null ||
      (jobMaxExp >= minExp && jobMinExp <= maxExp);

    return matchTitle && matchLocation && matchExperience;
  });

  setFilteredJobs(filtered);
  setLoading(false);

  
  if (isMobile() && storedTitle && storedLocation && storedExperience) {
    setShowModal(true);
  }
}, [jobs]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const updatedFields = { ...searchFields, [name]: value };
    setSearchFields(updatedFields);

    if (isMobile() && name === "title" && value.trim()) {
      try {
        const suggestions = await getJobSuggestions(value.trim());
        setJobSuggestions(suggestions);
        setShowSuggestions(true);
      } catch {
        setJobSuggestions([]);
        setShowSuggestions(false);
      }
    } else if (name === "title" && value.trim() === "") {
      setJobSuggestions([]);
      setShowSuggestions(false);
    }
    // Re-filter logic
    const title = updatedFields.title.toLowerCase().trim();
    const location = updatedFields.location.toLowerCase().trim();
    const experience = updatedFields.experience.trim();

    let minExp = null;
    let maxExp = null;

    if (experience.includes("-")) {
      const [min, max] = experience
        .split("-")
        .map((part) => parseInt(part.trim(), 10));
      minExp = isNaN(min) ? null : min;
      maxExp = isNaN(max) ? null : max;
    } else if (experience) {
      const exp = parseInt(experience, 10);
      minExp = isNaN(exp) ? null : exp;
      maxExp = isNaN(exp) ? null : exp;
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

    setFilteredJobs(filtered.length === 0 ? jobs : filtered);
  };

  const getDaysAgoText = (dateStr) => {
    const postDate = new Date(dateStr);
    const currentDate = new Date();
    const diffTime = currentDate - postDate;
    const daysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return daysAgo === 0 ? "Posted today" : `${daysAgo} Days Ago`;
  };

  const handleReadMore = (job) => {
    const jobId = job.job_id || job.Job_id;
    const employeeId = job.employee_id || job.Employee_id;
    localStorage.setItem("selected_job_id", jobId);
    localStorage.setItem("selected_employee_id", employeeId);
    navigate("/JobDetails", {
      state: { job, job_id: jobId, employee_id: employeeId },
    });
  };

  const handleSaveJob = async (job) => {
    const userId = localStorage.getItem("user_id");
    if (!userId || !job) {
      setAlertMsg("User not logged in or job details missing.");
      setAlertVariant("danger");
      // setTimeout(() => setAlertMsg(null), 2000);
      return;
    }

    const jobUniqueId = job.job_id || job.id;
    if (savedJobs.includes(jobUniqueId)) {
      setAlertMsg("This job has already been saved.");
      setAlertVariant("warning");
      // setTimeout(() => setAlertMsg(null), 6000);
      return;
    }

    const payload = {
      user: userId,
      job_id: jobUniqueId,
      job_title: job.job_title || "Untitled Job",
      sub_title: job.sub_title || "",
      key_skills: job.key_skills || "",
      comment: job.comment || "",
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
      const response = await AccessRefreshToken.post(
        `${BASE_URLL}api/Saved-post_by_user/`,
        payload,
        {
          headers: { Authorization: `Bearer ${accessToken11}` },
        }
      );

      // Mark job as saved if request succeeded
      if (response.status === 201 || response.status === 200) {
        setSavedJobs((prev) => [...prev, jobUniqueId]);
        // setAlertMsg("Job saved successfully.");
        alert("Job saved successfully.");
        setAlertVariant("success");
      } else {
        alert("This job is already saved by the user.");
        setAlertVariant("danger");
      }
    } catch (error) {
      console.error("Save job error:", error);
      alert("All Ready Saved.");
      setAlertVariant("danger");
    }
    // setTimeout(() => setAlertMsg(null), 8000);
  };

  const renderJobCard = (job, index) => {
    const skills = [
      ...(job.sub_title?.split(",") || []),
      ...(job.key_skills?.split(",") || []),
    ];

    return (
      <Card key={index} className="job-card p-3 shadow-sm mb-3">
        <h5>{job.job_title}</h5>
        <div className="text-muted">{job.company_name}</div>
        <div className="d-flex flex-wrap gap-3 text-muted mt-2 mb-2">
          <span>
            <FaBriefcase /> {job.Min_work_experience} -{" "}
            {job.Max_work_experience} Yrs
          </span>
          <span>
            <FaRupeeSign /> {job.Min_salary} -{" "}
            {job.Max_salary || "Not disclosed"}
          </span>
          <span>
            <FaMapMarkerAlt /> {job.location}
          </span>
        </div>
        <p className="text-truncate">{job.job_description}</p>
        <div className="d-flex flex-wrap gap-2 mb-2">
          {skills.map((skill, i) => (
            <span key={i} className="badge bg-light text-primary border">
              {skill.trim()}
            </span>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">{getDaysAgoText(job.date)}</small>
          <div className="d-flex gap-2">
            <Button
  variant="outline-primary"
  size="sm"
  className="rounded-pill"
  onClick={() => handleSaveJob(job)}
  disabled={savedJobs.includes(job.job_id || job.id)}
>
  {savedJobs.includes(job.job_id || job.id) ? "Saved" : "Save"}
</Button>


            <Button
              variant="outline-primary"
              size="sm"
              className="rounded-pill"
              onClick={() => handleReadMore(job)}
            >
              Read More
            </Button>
          </div>
        </div>
      </Card>
    );
  };
  // setTimeout(() => {
  //   setAlertMsg(null);
  // }, 2000);
  return (
    <Container fluid>
      <Form
        className="mb-4 bg-light rounded shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          if (isMobile()) {
            const { title, location, experience } = searchFields;
            if (!title || !location || !experience) {
              alert("Please fill in all search fields.");
              setAlertVariant("danger");

              setTimeout(() => {
                setAlertMsg(null);
              }, 300000);

              return;
            }
            setShowModal(true);
          }
        }}
      >
        <Row className="adv-job-search align-items-center">
          <Form.Label className="Search-label">
            <h1>Search Jobs</h1>
          </Form.Label>
          <Col md={4} sm={12} className="mb-2 position-relative">
            <Form.Control
              type="text"
              className="search-bm rounded-pill"
              placeholder="Search by Job Title"
              name="title"
              value={searchFields.title}
              onChange={handleInputChange}
              autoComplete="off"
            />
            {isMobile() && showSuggestions && jobSuggestions.length > 0 && (
              <ul className="list-group suggestion-dropdown position-absolute w-100">
                {jobSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action rounded-pill"
                    onClick={() => {
                      setSearchFields((prev) => ({
                        ...prev,
                        title: suggestion,
                      }));
                      setShowSuggestions(false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </Col>

          <Col md={4} sm={12} className="mb-2">
            <Form.Control
              type="text"
              className="search-bm rounded-pill"
              placeholder="Search by Location"
              name="location"
              value={searchFields.location}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Col>

          <Col md={3} sm={12} className="mb-2">
            <Form.Control
              type="text"
              className="search-bm rounded-pill"
              placeholder="Experience (e.g. 0 - 2)"
              name="experience"
              value={searchFields.experience}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Col>

          <Col xs={12} className="d-md-none">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="Click to view available job posts">
                  Search jobs
                </Tooltip>
              }
            >
              <Button
                type="submit"
                className="rounded-pill w-100 mt-2"
                alt="Click to view available job posts"
              >
                Search
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Form>

      {alertMsg && <Alert variant={alertVariant}>{alertMsg}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading jobs...</p>
        </div>
      ) : (
        <>
          {/* <Row className="d-none d-md-flex">
            {filteredJobs.map((job, index) => (
              <Col md={12} key={index}>
                {renderJobCard(job, index)}
              </Col>
            ))}
          </Row> */}
          

      <JobListWithPagination
  filteredJobs={filteredJobs}
  renderJobCard={renderJobCard}
/>
{/* <div className="job-not-found">
  
 {filteredJobs.length === 0 ? (
  <Card className="card-not-body">
                <div>No jobs found.</div>
                  </Card>   
              ) : (
                filteredJobs.map(renderJobCard)
              )}
         
</div> */}


{/* <div className="job-not-found">
  {filteredJobs.length === 0 ? (
    <Card className="card-not-body">
      <div className="not-found-text">
        {selectedFilters.location && selectedFilters.mode ? (
          <>No {selectedFilters.mode} jobs found in {selectedFilters.location}.</>
        ) : selectedFilters.location ? (
          <>No jobs found in {selectedFilters.location}.</>
        ) : selectedFilters.mode ? (
          <>No {selectedFilters.mode} jobs available.</>
        ) : (
          <>No jobs match your search criteria.</>
        )}
      </div>
    </Card>
  ) : (
    filteredJobs.map(renderJobCard)
  )}
</div> */}

          {/* Mobile Modal */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
            scrollable
          >
            <Modal.Header>
              <Modal.Title>Job Details</Modal.Title>
              <Button
                variant="outline-danger"
                onClick={() => setShowModal(false)}
                className="custom-close-btn"
              >
                ✕
              </Button>
            </Modal.Header>
            <Modal.Body>
      {loading ? (
      <Card className="text-center p-4 shadow-sm">
        <Card.Body>
          <Card.Title>Loading jobs...</Card.Title>
          <Spinner animation="border" variant="primary" className="mt-2" />
        </Card.Body>
      </Card>
    ) 
    : filteredJobs.length === 0 ? (
      <Card className="text-center p-4 shadow-sm">
        <Card.Body>
          <Card.Title>No jobs found</Card.Title>
        </Card.Body>
      </Card>
    ) 
    : (
      filteredJobs.map(renderJobCard)
    )}

            </Modal.Body>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default PostJobCard;
