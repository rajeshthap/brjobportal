import React, { useEffect, useState } from "react";
import { Container, Alert, Spinner } from "react-bootstrap";
import SavedJobCard from "./SavedJobCard";
import { savedJobPostView, deleteSavedJobById } from "../../../api/auth";

const SavedJobsList = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState(null);

  useEffect(() => {
    const getSavedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const jobs = await savedJobPostView(token);
        setSavedJobs(jobs || []);
      } catch (error) {
        console.error("Failed to fetch saved jobs", error);
        setAlertMsg("Failed to load saved jobs.");
      } finally {
        setLoading(false);
      }
    };
    getSavedJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem("token");
    try {
      await deleteSavedJobById(jobId, token);
      setSavedJobs((prevJobs) =>
        prevJobs.filter((job) => job.job_id !== jobId)
      );
    } catch (error) {
      alert("Failed to delete job");
      console.error("Delete error:", error?.response?.data || error.message);
    }
  };

  return (
    <Container className="edit-main">
      <h4 className="mb-3 pt-3 text-center">Your Saved Jobs</h4>

      {loading ? (
        <div className="text-center mt-3 my-5">
          <Spinner animation="border" />
          <p>Loading saved jobs...</p>
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="text-center no-saved-job">You have no saved jobs.</div>
      ) : (
        savedJobs.map((job) => (
          <SavedJobCard key={job.job_id} job={job} onDelete={handleDelete} />
        ))
      )}

      {alertMsg && <Alert variant="danger">{alertMsg}</Alert>}
    </Container>
  );
};

export default SavedJobsList;
