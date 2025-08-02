import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";

function UserAppliedJob() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const employeeId = localStorage.getItem("employee_id");
    const admin_access = localStorage.getItem("admin_access"); // your JWT access token
     
    if (employeeId && admin_access) {
      axios
        .get(`${BASE_URLL}api3/Get-applied-job/${employeeId}/`, {
          headers: {
            Authorization: `Bearer ${admin_access}`,
          },
        })
        .then((res) => {
          setAppliedJobs(res.data);
        })
        .catch((err) => {
          console.error("Error fetching applied jobs", err);
        });
    } else {
      console.warn("Missing employee ID or access token");
      // Optionally redirect to login here
    }
  }, []);

  return (
    <div>
      
      <Table striped bordered hover responsive>
        <thead className="text-white text-center emp-table">
          <tr>
            <th>Job Title</th>
            <th>Company Name</th>
            <th>Applicant Name</th>
            <th>Email</th>
            <th>Phone</th>

            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job, i) => (
              <tr key={i}>
                <td>{job.job_title}</td>
                <td>{job.company_name}</td>
                <td>{job.applicant_name}</td>
                <td>{job.applicant_email}</td>
                <td>{job.applicant_phone}</td>

                <td>
                  {job.resume ? (
                    <Link
                      to={`${BASE_URLL}/${job.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="post-btn btn"
                    >
                      View Resume
                    </Link>
                  ) : (
                    "Not uploaded"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default UserAppliedJob;
