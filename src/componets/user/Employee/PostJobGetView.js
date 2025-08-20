import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Container } from "react-bootstrap";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import { useNavigate } from "react-router-dom";

const PostJobGetView = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const employeeId = localStorage.getItem("employee_id");
    const admin_access = localStorage.getItem("admin_access");

    if (!admin_access) {
      navigate("/AdminLogin");
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${BASE_URLL}api3/job_posted_by_employee/${employeeId}/`,
          {
            headers: {
              Authorization: `Bearer ${admin_access}`,
            },
          }
        );
        setJobs(response.data);
        setError("");
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch posted jobs.");
        setLoading(false);
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
    const intervalId = setInterval(fetchJobs, 5000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div className="">
      <h3 className="mb-1 text-center">Posted Job List</h3>
      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark text-center emp-table">
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Company Email</th>
            <th>Job Title</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Work Mode</th>
            <th>Education</th>
            <th>Description</th>
            <th>Comment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {jobs.slice().reverse().map((job, index) => (
            <tr key={job.job_id}>
              <td>{index + 1}</td>
              <td>{job.company_name}</td>
              <td>{job.Employee_email}</td>
              <td>{job.job_title}</td>
              <td>{job.key_skills}</td>
              <td>
                {job.Min_work_experience} - {job.Max_work_experience} yrs
              </td>
              <td>
                ₹{job.Min_salary} - ₹{job.Max_salary}
              </td>
              <td>{job.location}</td>
              <td>{job.work_mode}</td>
              <td>{job.education}</td>
              <td>{job.job_description}</td>
              <td>{job.comment || "-"}</td>
              <td>{new Date(job.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostJobGetView;
