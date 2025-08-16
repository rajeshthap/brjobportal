import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import {
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//import "../../../assets/css/Applied.css";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";

const MyAppliedJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `${BASE_URLL}api3/GetappliedJob_by_user/${userId}/`
        );
       

        if (Array.isArray(response.data)) {
          setAppliedJobs(response.data);
        } else {
          setAppliedJobs([]);
          console.warn("Unexpected API response format");
        }
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
        setError("Failed to load applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAppliedJobs();
    } else {
      setLoading(false);
      setError("User ID not found. Please log in again.");
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="text-center loading-spinner mt-5">
        <Spinner animation="border" variant="primary" /> <p>Loading Applied Job</p>
      </div>
    );
  }

  return (
    <Container className="edit-main">
      <div className="d-flex justify-content-between align-items-center  mb-3">
        <Button
          variant="outline-secondary"
          onClick={() => navigate(-1)}
          className="back-button "
        >
          ← Back
        </Button>
        <h4 className="myappliedjob-top-heading">
          Applied Jobs{" "}
          <span className="badge bg-primary">{appliedJobs.length}</span>
        </h4>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <Col md={12} key={job.id} className="mb-4">
              <Card className="applied-job-card h-100">
                <Card.Body>
                  <Card.Title>{job.job_title}</Card.Title>

                  <Card.Text>
                    <FaBuilding className="me-2" />
                    <strong>Company:</strong> {job.company_name}
                  </Card.Text>

                  <Card.Text>
                    <FaCalendarAlt className="me-2" />
                    <strong>Applied On:</strong>{" "}
                    {new Date(job.applied_on).toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info" className="w-100 text-center">
              You have not applied to any jobs yet.
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default MyAppliedJob;
