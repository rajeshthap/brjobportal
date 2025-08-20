import React from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaBookmark,
  FaTrash,
  FaArrowLeft,
  FaCheckCircle,
  FaBriefcase,
  FaRupeeSign,
} from "react-icons/fa";

import { FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SavedJobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    onDelete(job.job_id);
  };

  const handleApplyNow = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("Please login to apply for jobs.");
      navigate("/UserLogin");
    } else {
      localStorage.setItem("selected_job_id", job.job_id);
      navigate("/JobDetails", { state: { job } });
    }
  };

  const keySkills = [
    ...(job.sub_title?.split(",") || []),
    ...(job.key_skills?.split(",") || []),
  ];

  const experience =
    job.experience ||
    `${job.Min_work_experience || 0} - ${job.Max_work_experience || 0} Yrs`;
  const salary =
    job.salary ||
    `${job.Min_salary || 0} - ${job.Max_salary || "Not disclosed"}`;
  const location = job.location || "Not specified";

  return (
    <Card className=" p-3 card-box ">
      <Row className="align-items-center">
        <Col lg={12} sm={12} md={12} className="p-3">
          <h5 className="mb-1">{job.job_title}</h5>
          <p className="text-muted mb-1">{job.company_name}</p>

          <div
            className="d-flex flex-wrap gap-2 mb-2 text-muted"
            style={{ fontSize: "0.9rem" }}
          >
            <span>
              <FaBriefcase className="me-1" /> {experience}
            </span>
            <span>
              <FaRupeeSign className="me-1" /> {salary}
            </span>
            <span>
              <FaMapMarkerAlt className="me-1" /> {location}
            </span>
          </div>

          <p className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
            {job.comment || "No description available"}
          </p>

          <div className="d-flex flex-wrap gap-2 mb-2">
            {keySkills.map((skill, idx) => (
              <Badge key={idx} bg="light" text="dark" className="me-1">
                {skill.trim()}
              </Badge>
            ))}
          </div>
          <div className="mob-desk-top-view">
            <div className="d-flex justify-content-between   align-items-center">
              <small className="text-muted">
                Posted {new Date(job.date).toLocaleDateString()}
              </small>
              <div className="d-flex align-items-center gap-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate(-1)}
                  size="sm"
                >
                  <FaArrowLeft className="me-1" />
                  Back
                </Button>

                <span className="text-primary d-flex align-items-center gap-1">
                  Saved <FaBookmark />
                </span>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDeleteClick}
                >
                  <FaTrash /> Delete
                </Button>

                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={handleApplyNow}
                >
                  <FaUserCheck /> Apply Now
                </Button>
              </div>
            </div>
          </div>
          {/* mobile view */}
          <Row className="mob-saved-job-btn">
            <Col lg={12} sm={12} md={12} className="p-0 mob-view-style">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate(-1)}
                    size="sm"
                  >
                    <FaArrowLeft className="me-1" />
                    Back
                  </Button>

                  <Button
                    variant="outline-primary"
                    className="text-primary d-flex"
                  >
                    Saved
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={handleApplyNow}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default SavedJobCard;
