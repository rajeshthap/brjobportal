import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import SavedJobCard from "./SavedJobCard";
import { savedJobPostView, deleteSavedJobById } from "../../../api/auth";

const SavedJobsList = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const getSavedJobs = async () => {
      const token = localStorage.getItem("token");
      const jobs = await savedJobPostView(token);
      setSavedJobs(jobs);
    };

    getSavedJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem("token");
    console.log("Deleting job with ID:", jobId);

    try {
      const response = await deleteSavedJobById(jobId, token);
      console.log("Delete API response:", response);

      setSavedJobs((prevJobs) =>
        prevJobs.filter((job) => job.job_id !== jobId)
      );
    } catch (error) {
      alert("Failed to delete job");
      console.error("Delete error:", error?.response?.data || error.message);
    }
  };




  return (
    <Container className="save-details">
      {/* <div className="mb-4 text-center">
        <h5 className="text-muted">Jobs saved by you</h5>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.2rem" }}>
          {savedJobs.length.toString().padStart(2, "0")}
        </h1>
        <p className="text-muted">Saved Job(s)</p>
      </div> */}
      <Row>  {savedJobs.map((job) => (
        <SavedJobCard key={job.job_id} job={job} onDelete={handleDelete} />
      ))}</Row>

    </Container>
  );
};

export default SavedJobsList;
