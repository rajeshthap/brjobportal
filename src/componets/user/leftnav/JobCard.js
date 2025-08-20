import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import "../../../assets/css/JobCard.css";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import { useNavigate } from "react-router-dom";

const JobCard = () => {
  const employee_id = localStorage.getItem("employee_id");
  const navigate = useNavigate();
  const handleCancel = () => {
  navigate("/EmployeeDashboard");  // or your desired route
};
  const [formData, setFormData] = useState({
    company_name: "",
    Employee_email: "",
    job_title: "",
    sub_title: [],
    key_skills: "",
    comment: "",
    location: "",
    experience: "",
    salary: "",
    work_mode: "",
    education: "",
    job_description: "",
    Min_Salary: "",
    Max_Salary: "",
    Min_work_experience: "",
    Max_work_experience: "",
  });

  const subtitleOptions = {
    "Front End Developer": [
      { label: "HTML", value: "HTML" },
      { label: "CSS", value: "CSS" },
      { label: "JavaScript", value: "JavaScript" },
      { label: "React JS", value: "React JS" },
      { label: "Bootstrap", value: "Bootstrap" },
      { label: "Tailwind", value: "Tailwind" },
    ],
    "Back End Developer": [
      { label: "Node JS", value: "Node JS" },
      { label: "Express", value: "Express" },
      { label: "MongoDB", value: "MongoDB" },
      { label: "JWT", value: "JWT" },
      { label: "SQL", value: "SQL" },
    ],
    "Full Stack Developer": [
      { label: "HTML", value: "HTML" },
      { label: "CSS", value: "CSS" },
      { label: "JavaScript", value: "JavaScript" },
      { label: "React JS", value: "React JS" },
      { label: "Node JS", value: "Node JS" },
      { label: "MongoDB", value: "MongoDB" },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "job_title") {
      setFormData((prev) => ({ ...prev, sub_title: [], key_skills: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const keySkills = Array.isArray(formData.sub_title)
      ? formData.sub_title.join(", ")
      : "";

    const payload = {
      Employee_id: employee_id,
      company_name: formData.company_name,
      Employee_email: formData.Employee_email,
      job_title: formData.job_title,
      sub_title: keySkills,
      key_skills: keySkills,
      comment: formData.comment,
      location: formData.location,
      experience: formData.experience,
      salary: formData.salary,
      work_mode: formData.work_mode,
      education: formData.education,
      job_description: formData.job_description,
      Min_salary: formData.Min_Salary,
      Max_salary: formData.Max_Salary,
      Min_work_experience: formData.Min_work_experience,
      Max_work_experience: formData.Max_work_experience,
    };
    const admin_access = localStorage.getItem("admin_access");
    if (!admin_access) {
      navigate("/AdminLogin");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URLL}api3/PostJonbyemloyee/`,

        payload,
        {
          headers: {
            Authorization: `Bearer ${admin_access}`,
          },
        }
      );
      const jobId =
        response.data.job_id || response.data.Job_id || response.data.id;

      localStorage.setItem("selected_job_id", jobId);

      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to post job. Check console for details.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Card className="p-4">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name:<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
              <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Employee email:<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="Employee_email"
                  value={formData.Employee_email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Job Title:<span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select job title</option>
                  {Object.keys(subtitleOptions).map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Skills:<span className="text-danger">*</span></Form.Label>
                {subtitleOptions[formData.job_title] ? (
                  <Select
                    required
                    isMulti
                    options={subtitleOptions[formData.job_title]}
                    value={formData.sub_title.map((val) => ({
                      label: val,
                      value: val,
                    }))}
                    onChange={(selected) =>
                      setFormData({
                        ...formData,
                        sub_title: selected.map((opt) => opt.value),
                        key_skills: selected.map((opt) => opt.value).join(", "),
                      })
                    }
                  />
                ) : (
                  <Form.Control
                    name="sub_title"
                    value={formData.sub_title}
                    onChange={handleChange}
                    required
                  />
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Location:<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Experience:<span className="text-danger">*</span></Form.Label>
                <Form.Select
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Salary:<span className="text-danger">*</span></Form.Label>
                <Form.Select
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Salary</option>
                  <option value="Below ₹1 LPA">Below ₹1 LPA</option>
                  <option value="₹1 - ₹3 LPA">₹1 - ₹3 LPA</option>
                  <option value="₹3 - ₹5 LPA">₹3 - ₹5 LPA</option>
                  <option value="₹5 - ₹7 LPA">₹5 - ₹7 LPA</option>
                  <option value="₹7 - ₹10 LPA">₹7 - ₹10 LPA</option>
                  <option value="Above ₹10 LPA">Above ₹10 LPA</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Work Mode:<span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="work_mode"
                  value={formData.work_mode}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Mode</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Education:<span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Education</option>
                  <option value="High School">High School</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelors">Bachelor's</option>
                  <option value="Masters">Master's</option>
                  <option value="PhD">PhD</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Min Salary (₹):<span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="Min_Salary"
                  value={formData.Min_Salary}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Min Salary</option>
                  <option value="5000">₹5,000</option>
                  <option value="10000">₹10,000</option>
                  <option value="15000">₹15,000</option>
                  <option value="20000">₹20,000</option>
                  <option value="25000">₹25,000</option>
                  <option value="30000">₹30,000</option>
                  <option value="40000">₹40,000</option>
                  <option value="50000">₹50,000</option>
                  <option value="60000">₹60,000</option>
                  <option value="75000">₹75,000</option>
                  <option value="100000">₹1,00,000</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Max Salary (₹):<span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="Max_Salary"
                  value={formData.Max_Salary}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Max Salary</option>
                  <option value="10000">₹10,000</option>
                  <option value="15000">₹15,000</option>
                  <option value="20000">₹20,000</option>
                  <option value="25000">₹25,000</option>
                  <option value="30000">₹30,000</option>
                  <option value="40000">₹40,000</option>
                  <option value="50000">₹50,000</option>
                  <option value="60000">₹60,000</option>
                  <option value="75000">₹75,000</option>
                  <option value="100000">₹1,00,000</option>
                  <option value="150000">₹1,50,000</option>
                  <option value="200000">₹2,00,000</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Min Work Experience:<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="Min_work_experience"
                  value={formData.Min_work_experience}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Max Work Experience:<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="Max_work_experience"
                  value={formData.Max_work_experience}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Job Description:<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="job_description"
                  value={formData.job_description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Comment:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  
                />
              </Form.Group>
            </Col>
          </Row>
        </Card>

        <div className="text-center my-3">
          <Button type="submit" variant="" className="post-btn">
            Post Job
          </Button>
         
         
        </div>
      </Form>
    </Container>
  );
};

export default JobCard;
