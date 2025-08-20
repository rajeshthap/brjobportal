import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import { MdUpdate } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
const qualificationOptions = [
  "10th",
  "12th",
  "Diploma",
  "Graduation",
  "Post Graduation",
  "PhD",
];
const boardOptions = [
  "CBSE",
  "ICSE",
  "State Board",
  "Uttarakhand Technical University (UTU)",
  "Maya Group of Colleges",
  "Graphic Era University",
  "DIT University",
  "HNB Garhwal University",
  "Quantum University",
  "UPES Dehradun",
  "Tulas Institute",
  "Dev Bhoomi Uttarakhand University",
  "Alpine Institute of Management & Technology",
  "Shivalik College of Engineering",
  "BFIT Group of Institutions",
  "Beehive College of Engineering and Technology",
  "Amrapali Group of Institutes",
  "IMS Unison University",
  "GRD Institute of Management & Technology",
];
const yearOptions = Array.from({ length: 30 }, (_, i) => 2025 - i);
const graduationOptions = ["B.Tech", "BCA", "B.Com", "BA", "B.Sc"];
const mastersOptions = ["M.Tech", "MBA", "MCA", "MA", "M.Sc"];
const languageOptions = [
  "Hindi",
  "English",
  "Punjabi",
  "Urdu",
  "Gujarati",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Assamese",
  "Odia",
  "Konkani",
  "Sanskrit",
  "Kashmiri",
  "Sindhi",
  "Nepali",
  "Tibetan",
  "Bodo",
  "Santhali",
  "Maithili",
  "Dogri",
  "Bhili",
  "Gondi",
].map((lang) => ({ label: lang, value: lang }));
const distanceLearningOptions = qualificationOptions
  .filter((q) => q !== "PhD")
  .map((q) => ({ label: q, value: q }));
const degreeLabels = ["10th", "12th", "Diploma", "Graduation", "Masters"];
const ViewProfile = () => {
  const [selectedFullTimeLearning, setSelectedFullTimeLearning] = useState([]);
  const [selectedDistanceLearning, setSelectedDistanceLearning] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    adress1: "",
    adress2: "",
    zip_code: "",
    city: "",
    state: "",
    Country: "",
    Hobbies: "",
    languages: "",
    skills: "",
    Linked_url: "",
    objetive: "",
    Full_time: "",
    Distance_learning: "",
    Proffesional_experience: "",
  });
  const [educationList, setEducationList] = useState(
    Array(5).fill({
      qualification: "",
      school: "",
      board: "",
      year: "",
      marks: "",
    })
  );
  const [courseType, setCourseType] = useState("");
  const [photo] = useState(null);
  const [resume] = useState(null);
  const [, setPhotoPreview] = useState(null);

  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const accessToken11 = localStorage.getItem("access_token1");

  useEffect(() => {
    if (!accessToken11) window.location.href = "/UserLogin";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URLL}api2/resume-detail/?user=${user_id}`,
          {
            headers: { Authorization: `Bearer ${accessToken11}` },
          }
        );

        const data = res.data;

        // Languages
        let langs = [];
        try {
          langs = JSON.parse(data.languages);
        } catch {
          langs = data.languages.split(",").map((l) => l.trim());
        }
        const selectedLangs = langs
          .map((l) => languageOptions.find((opt) => opt.value === l))
          .filter(Boolean);
        setSelectedLanguages(selectedLangs);

        // Distance Learning
        let dist = [];
        if (data.Distance_learning) {
          dist = data.Distance_learning.split(",").map((d) => d.trim());
          const selected = dist
            .map((d) => distanceLearningOptions.find((opt) => opt.value === d))
            .filter(Boolean);
          setSelectedDistanceLearning(selected);
          setCourseType("distance");
        } else {
          setCourseType("full");
        }

        setFormData({
          full_name: data.full_name || "",
          email: data.email || "",
          phone: data.phone || "",
          adress1: data.adress1 || "",
          adress2: data.adress2 || "",
          zip_code: data.zip_code || "",
          city: data.city || "",
          state: data.state || "",
          Country: data.Country || "",
          Hobbies: data.Hobbies || "",
          languages: langs.join(", ") || "",
          skills: data.skills || "",
          Linked_url: data.Linked_url || "",
          objetive: data.objetive || "",
          Full_time: data.full_time || "", // We'll fill later in submit
          Distance_learning: data.Distance_learning || "", // Same
          Proffesional_experience: data.Proffesional_experience || "",
        });

        if (data.photo) setPhotoPreview(`${BASE_URLL}${data.photo}`);
        setEducationList([
          data.Tenth_Details || {},
          data.Twelth_Details || {},
          data.Diploma_Details || {},
          data.Graduation_Details || {},
          data.Masters_Details || {},
        ]);
        
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [user_id]);
  // Place this AFTER your useEffect(fetchData)
  useEffect(() => {
    if (!formData.Distance_learning || educationList.length === 0) return;

    let distList = [];
    try {
      distList = JSON.parse(formData.Distance_learning);
    } catch {
      distList = formData.Distance_learning.split(",").map((d) => d.trim());
    }
    const filledEducationLevels = educationList
      .filter(
        (e) => e.qualification && e.school && e.board && e.year && e.marks
      )
      .map((e) => e.qualification);

    const filteredOptions = distanceLearningOptions.filter((opt) =>
      filledEducationLevels.includes(opt.value)
    );

    const matched = distList
      .map((d) => filteredOptions.find((opt) => opt.value === d))
      .filter(Boolean);

    setSelectedDistanceLearning(matched);
  }, [formData.Distance_learning, educationList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index, e) => {
    const updated = [...educationList];
    updated[index][e.target.name] = e.target.value;
    setEducationList(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build selected values
    const selectedDistanceValues = selectedDistanceLearning.map((d) => d.value);

    // Filter valid education entries
    const validEducations = educationList.filter((edu) => edu.qualification);

    const distanceLearningData = validEducations
      .filter((edu) => selectedDistanceValues.includes(edu.qualification))
      .map((edu) => edu.qualification);

    const fullTimeData =
      courseType === "distance"
        ? validEducations
            .filter(
              (edu) => !selectedDistanceValues.includes(edu.qualification)
            )
            .map((edu) => edu.qualification)
        : validEducations.map((edu) => edu.qualification);

    const payload = new FormData();
    payload.append("user", user_id);
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "Distance_learning" && key !== "Full_time") {
        payload.append(key, value);
      }
    });

    payload.append(
      "languages",
      selectedLanguages.map((l) => l.value).join(", ")
    );
    payload.append("Distance_learning", JSON.stringify(distanceLearningData));
    payload.append("Full_time", JSON.stringify(fullTimeData));

    const map = [
      "Tenth_Details",
      "Twelth_Details",
      "Diploma_Details",
      "Graduation_Details",
      "Masters_Details",
    ];
    educationList.forEach((edu, idx) => {
      payload.append(map[idx], JSON.stringify(edu || {}));
    });

    if (photo) payload.append("photo", photo);
    if (resume instanceof File) payload.append("resume", resume);

    try {
      await axios.post(`${BASE_URLL}api2/custom-resume/`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken11}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Resume updated successfully!");
      navigate("/UserProfile");
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Something went wrong.");
    }
  };

  const filledEducationLevels = educationList
    .filter((e) => e.qualification && e.school && e.board && e.year && e.marks)
    .map((e) => e.qualification)
    .filter((q) => qualificationOptions.includes(q));

  const filteredDistanceLearningOptions = distanceLearningOptions.filter(
    (opt) => filledEducationLevels.includes(opt.value)
  );

  return (
    <Container className="mt-5 mb-5 edit-main">
      <Card className="p-4 shadow rounded-4">
      <h3 className="text-center mb-4">Edit Resume</h3>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  className="form-control"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">LinkedIn</label>
                <input
                  className="form-control"
                  name="Linked_url"
                  value={formData.Linked_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Zip Code</label>
                <input
                  className="form-control"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label">Address Line 1</label>
                <input
                  className="form-control"
                  name="adress1"
                  value={formData.adress1}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address Line 2</label>
                <input
                  className="form-control"
                  name="adress2"
                  value={formData.adress2}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">State</label>
                <input
                  className="form-control"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
               <div className="mb-3">
                <label className="form-label">Country</label>
                <input
                  className="form-control"
                  name="Country"
                  value={formData.Country}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>

          <hr />
          <h5 className="text-secondary">Educational Details</h5>
          {educationList.map((edu, index) => {
            const isGraduation = edu.qualification === "Graduation";
            const isMasters =
              edu.qualification === "Post Graduation" ||
              edu.qualification === "Masters";
            return (
              <div key={index} className="border p-3 mb-3 bg-light rounded">
                <strong className="text-primary">
                  {degreeLabels[index] || `Education ${index + 1}`}
                </strong>
                <Row className="mt-2">
                  <Col md={3}>
                    <select
                      className="form-select"
                      name="qualification"
                      value={edu.qualification}
                      onChange={(e) => handleEducationChange(index, e)}
                    >
                      <option value="">Qualification</option>
                      {qualificationOptions.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col md={3}>
                    {isGraduation || isMasters ? (
                      <select
                        className="form-select"
                        name="school"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, e)}
                      >
                        <option value="">Select Course</option>
                        {(isGraduation
                          ? graduationOptions
                          : mastersOptions
                        ).map((course) => (
                          <option key={course} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="form-control"
                        name="school"
                        placeholder="School/College"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, e)}
                      />
                    )}
                  </Col>
                  <Col md={2}>
                    <select
                      className="form-select"
                      name="board"
                      value={edu.board}
                      onChange={(e) => handleEducationChange(index, e)}
                    >
                      <option value="">Board</option>
                      {boardOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col md={2}>
                    <select
                      className="form-select"
                      name="year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, e)}
                    >
                      <option value="">Year</option>
                      {yearOptions.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col md={2}>
                    <input
                      className="form-control"
                      name="marks"
                      type="number"
                      placeholder="%"
                      value={edu.marks}
                      onChange={(e) => handleEducationChange(index, e)}
                    />
                  </Col>
                </Row>
              </div>
            );
          })}

          <div className="mb-3">
            <label className="form-label">Hobbies</label>
            <input
              className="form-control"
              name="Hobbies"
              value={formData.Hobbies}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Languages</label>
            <Select
              isMulti
              options={languageOptions}
              value={selectedLanguages}
              onChange={setSelectedLanguages}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Skills</label>
            <input
              className="form-control"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Objective</label>
            <textarea
              className="form-control"
              name="objetive"
              value={formData.objetive}
              onChange={handleChange}
            />
          </div>
          

          <div className="mb-3">
            <label className="form-label">Course Type</label>
            <div>
              <input
                className="form-check-input me-2"
                type="radio"
                name="courseType"
                value="full"
                checked={courseType === "full"}
                onChange={(e) => setCourseType(e.target.value)}
              />
              <label className="form-check-label me-3">Full Time</label>

              <input
                className="form-check-input me-2"
                type="radio"
                name="courseType"
                value="distance"
                checked={courseType === "distance"}
                onChange={(e) => setCourseType(e.target.value)}
              />
              <label className="form-check-label">Distance</label>
            </div>
          </div>

          {courseType === "distance" && (
            <div className="mb-3">
              <label className="form-label">
                Select Distance Learning Modes
              </label>
              {filteredDistanceLearningOptions.length > 0 ? (
                <Select
                  isMulti
                  options={filteredDistanceLearningOptions}
                  value={selectedDistanceLearning}
                  onChange={setSelectedDistanceLearning}
                />
              ) : (
                <div className="text-danger">
                  Please fill educational details first (10th, 12th, etc.)
                </div>
              )}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Professional Experience</label>
            <textarea
              className="form-control"
              name="Proffesional_experience"
              value={formData.Proffesional_experience}
              onChange={handleChange}
            />
          </div>

          <div className="text-center d-flex justify-content-center gap-3">
           <Button type="submit" variant="" className="px-4 edit-r-btn"><MdUpdate className="icon-size" />
              Update Resume
            </Button>
           <Button type="button" variant="" className="px-4 close-btn-btn" onClick={() => navigate("/UserProfile")}><MdOutlineCancel  className="icon-size"/> Cancel</Button>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default ViewProfile;
