import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Form, Row, Col, Button, Container, Card } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/css/Profile.css";
import { GetUserRegistration } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import LocationSelect from "./LocationSelect";

export const UserRegistration = async (formDataToSend) => {
  try {
    const res = await axios.post(
      `${BASE_URLL}api2/custom-resume/`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});

  const [educations, setEducations] = useState([
    {
      qualification: "",
      courseDetail: "",
      school: "",
      board: "",
      year: "",
      percentage: "",
    },
  ]);
  const [courseType, setCourseType] = useState("");
  const [distanceCourse, setDistanceCourse] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adress1: "",
    adress2: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    Linked_url: "",
    skills: "",
    Proffesional_experience: "",
    objective: "",
    hobbies: "",
    photo: "",
  });

  const languageOptions = [
    { value: "Hindi", label: "Hindi" },
    { value: "English", label: "English" },
    { value: "Tamil", label: "Tamil" },
    { value: "Marathi", label: "Marathi" },
    { value: "Telugu", label: "Telugu" },
    { value: "Gujarati", label: "Gujarati" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "Bengali", label: "Bengali" },
    { value: "Kannada", label: "Kannada" },
    { value: "Urdu", label: "Urdu" },
  ];

  const handleInputChange = (field, value) => {
    const updatedFormData = { ...formData };
    const updatedErrors = { ...formErrors };

    if (field === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        updatedFormData[field] = numericValue;
        updatedErrors[field] = "";
      }
    } else if (field === "zip_code") {
      updatedFormData[field] = value.replace(/\D/g, "");
    } else if (field === "Linked_url") {
      updatedFormData[field] = value;
      const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com(\/.*)?$/i;
      updatedErrors[field] = linkedinRegex.test(value)
        ? ""
        : "Please enter a valid LinkedIn URL";
    } else {
      updatedFormData[field] = value;
    }

    setFormData(updatedFormData);
    setFormErrors(updatedErrors);
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      {
        qualification: "",
        courseDetail: "",
        school: "",
        board: "",
        year: "",
        percentage: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLanguageChange = (selected) => {
    setSelectedLanguages(selected || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUserData = localStorage.getItem("userRegistrationData");
    const user = storedUserData ? JSON.parse(storedUserData) : null;
    const userId = user?.id;

    if (!userId) {
      alert("User ID not found.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("user", userId);
    formDataToSend.append("full_name", formData.name || "");
    formDataToSend.append("email", formData.email || "");
    formDataToSend.append("phone", formData.phone || "");
    formDataToSend.append("adress1", formData.adress1 || "");
    formDataToSend.append("adress2", formData.adress2 || "");
    formDataToSend.append("Country", formData.country || "");
    formDataToSend.append("state", formData.state || "");
    formDataToSend.append("city", formData.city || "");
    formDataToSend.append("zip_code", formData.zip_code || "");
    formDataToSend.append("Linked_url", formData.Linked_url || "");
    formDataToSend.append("skills", formData.skills || "");
    formDataToSend.append("objetive", formData.objective || "");
    formDataToSend.append(
      "Proffesional_experience",
      formData.Proffesional_experience || ""
    );
    formDataToSend.append("Hobbies", formData.hobbies || "");
    if (file) {
      formDataToSend.append("photo", file);
    }
    if (courseType === "full") {
      const allDistanceValues = distanceCourse.map((opt) => opt.value);
      formDataToSend.append(
        "Distance_learning",
        JSON.stringify(allDistanceValues)
      );
    } else if (courseType === "distance") {
      const selectedValues = distanceCourse.map((dc) => dc.value);
      formDataToSend.append(
        "Distance_learning",
        JSON.stringify(selectedValues)
      );
    }
    const selectedDistanceValues = distanceCourse.map((dc) => dc.value);

    // Distance learning = only selected qualification names
    const distanceLearningData = educations
      .filter((edu) => selectedDistanceValues.includes(edu.qualification))
      .map((edu) => edu.qualification);

    // Full time = remaining qualification names
    const fullTimeData =
      courseType === "distance"
        ? educations
            .filter(
              (edu) => !selectedDistanceValues.includes(edu.qualification)
            )
            .map((edu) => edu.qualification)
        : educations.map((edu) => edu.qualification);

    formDataToSend.append(
      "Distance_learning",
      JSON.stringify(distanceLearningData)
    );
    formDataToSend.append("Full_time", JSON.stringify(fullTimeData));

    // if (courseType === "full") {
    //   // Send ALL distance course dropdown options (not just selected ones)
    //   const allDistanceValues = distanceCourse.map((opt) => opt.value);
    //   formDataToSend.append("Distance_learning", JSON.stringify(allDistanceValues));
    // console.log("all data full",allDistanceValues )
    // } else if (courseType === "distance") {
    //   // Send ONLY selected distance options
    //   const selectedValues = distanceCourse.map((dc) => dc.value);
    //   formDataToSend.append("Distance_learning", JSON.stringify(selectedValues));
    // }

    formDataToSend.append(
      "languages",
      JSON.stringify(selectedLanguages.map((lang) => lang.value))
    );

    const eduMap = {
      "10th": "Tenth_Details",
      "12th": "Twelth_Details",
      Diploma: "Diploma_Details",
      Graduation: "Graduation_Details",
      "Post Graduation": "Masters_Details",
    };

    educations.forEach((edu) => {
      const key = eduMap[edu.qualification];
      if (key) {
        formDataToSend.append(
          key,
          JSON.stringify({
            qualification: edu.qualification || "", // use actual qualification name
            // courseDetail: edu.courseDetail || "",
            school: edu.school || "",
            marks: edu.percentage || "",
            board: edu.board || "",
            year: edu.year || "",
          })
        );
      }
    });

    educations.forEach((edu) => {
      const key = eduMap[edu.qualification];
      if (key) {
        formDataToSend.append(
          key,
          JSON.stringify({
            qualification: edu.qualification || "",
            school: edu.school || "",
            marks: edu.percentage || "",
            board: edu.board || "",
            year: edu.year || "",
          })
        );
      }
    });

    try {
      const response = await UserRegistration(formDataToSend);
      const data = response.data;

      alert("Profile submitted successfully!");
      navigate("/UserLogin");
    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);
      alert("Submission failed.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("autoId");
        if (!userId) return;
        const userData = await GetUserRegistration(userId);
        if (userData) {
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            adress1: userData.adress1 || "",
            adress2: userData.adress2 || "",
            Country: userData.Country || "",
            state: userData.state || "",
            city: userData.city || "",
            zip_code: userData.zip_code || "",
            Linked_url: userData.Linked_url || "",
            skills: userData.skills || "",
            objective: userData.objetive || "",
            Proffesional_experience: userData.Proffesional_experience || "",
            hobbies: userData.Hobbies || "",
            photo: userData.photo || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <Container className="mt-4 mb-5 register-resume">
      <Card className="p-4 shadow-lg resume-title">
        <h3 className="text-center mb-4 ">Professional and Creative Resume</h3>

        <Form onSubmit={handleSubmit}>
          <Row className="jp-feilds-design pt-2 m-1">
            <Col md={6} lg={6} sm={12}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  isInvalid={!!formErrors.name}
                  required
                />
                {formErrors.name && (
                  <Form.Text className="text-danger">
                    {formErrors.name}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6} lg={6} sm={12}>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  isInvalid={!!formErrors.email}
                  required
                />
                {formErrors.email && (
                  <Form.Text className="text-danger">
                    {formErrors.email}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6} lg={6} sm={12}>
              <Form.Group className="mb-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  isInvalid={!!formErrors.phone}
                  required
                />
                {formErrors.phone && (
                  <Form.Text className="text-danger">
                    {formErrors.phone}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6} lg={6} sm={12}>
              <Form.Group className="mb-2">
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address 1"
                  value={formData.adress1}
                  onChange={(e) => handleInputChange("adress1", e.target.value)}
                  isInvalid={!!formErrors.adress1}
                  required
                />
                {formErrors.adress1 && (
                  <Form.Text className="text-danger">
                    {formErrors.adress1}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6} lg={6} sm={12}>
              <Form.Group className="mb-2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address 2"
                  value={formData.adress2}
                  onChange={(e) => handleInputChange("adress2", e.target.value)}
                  isInvalid={!!formErrors.adress2}
                 
                />
                {formErrors.adress2 && (
                  <Form.Text className="text-danger">
                    {formErrors.adress2}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <LocationSelect
              formData={formData}
              handleInputChange={handleInputChange}
              formErrors={formErrors}
            />
            <Col md={6} lg={6} sm={12} className="mt-2">
              <Form.Group className="mb-2">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter zip code"
                  value={formData.zip_code}
                  onChange={(e) =>
                    handleInputChange("zip_code", e.target.value)
                  }
                  isInvalid={!!formErrors.zip_code}
                  required
                />
                {formErrors.zip_code && (
                  <Form.Text className="text-danger">
                    {formErrors.zip_code}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={6} lg={6} sm={12} className="mt-2">
              <Form.Group className="mb-2">
                <Form.Label>LinkedIn URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter LinkedIn URL"
                  value={formData.Linked_url}
                  onChange={(e) =>
                    handleInputChange("Linked_url", e.target.value)
                  }
                  isInvalid={!!formErrors.Linked_url}
                  required
                />
                {formErrors.Linked_url && (
                  <Form.Text className="text-danger">
                    {formErrors.Linked_url}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            {/* <Col md={6} lg={6} sm={12}>
              <Form.Group className="mb-2">
                <Form.Label>Country</Form.Label>
                <Form.Select
                  value={formData.Country}
                  onChange={(e) => handleInputChange("Country", e.target.value)}
                  isInvalid={!!formErrors.Country}
                  required
                >
                  <option value="">Select Country</option>
                 
                </Form.Select>
                {formErrors.Country && (
                  <Form.Text className="text-danger">
                    {formErrors.Country}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6} lg={6} sm={12}>
              <Form.Group className="mb-2">
                <Form.Label>State</Form.Label>
                <Form.Select
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  isInvalid={!!formErrors.state}
                  required
                >
                  <option value="">Select state</option>
                </Form.Select>
                {formErrors.state && (
                  <Form.Text className="text-danger">
                    {formErrors.state}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6} lg={6} sm={12}>
              <Form.Group className="mb-2">
                <Form.Label>City</Form.Label>
                <Form.Select
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  isInvalid={!!formErrors.city}
                  required
                >
                  <option value="">Select city</option>
                </Form.Select>
                {formErrors.city && (
                  <Form.Text className="text-danger">
                    {formErrors.city}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6} lg={6} sm={12}>
              <Form.Group className="mb-2">
                <Form.Label>Zip Code</Form.Label>
                <Form.Select
                  value={formData.zip_code}
                  onChange={(e) =>
                    handleInputChange("zip_code", e.target.value)
                  }
                  isInvalid={!!formErrors.zip_code}
                  required
                >
                  <option value="">Select zip code</option>
                </Form.Select>
                {formErrors.zip_code && (
                  <Form.Text className="text-danger">
                    {formErrors.zip_code}
                  </Form.Text>
                )}
              </Form.Group>
            </Col> */}
          </Row>

          <Form.Group className="mb-4 mt-3">
            <Form.Label>
              <strong>Objective</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Write your objective"
              required
              value={formData.objective}
              onChange={(e) => handleInputChange("objective", e.target.value)}
            />
          </Form.Group>

          <div className="educat-desin">
            <h5 className="mt-4 mb-2">Educational Details</h5>
            <Button
              variant="outline-primary"
              className="mb-2 education-add"
              onClick={addEducation}
              required
            >
              <FaPlusCircle className="me-2" /> Add Education
            </Button>

            <Row className="fw-bold education-add mb-2">
              <Col md={2} className="Qualification-option">
                Qualification
              </Col>
              <Col md={3}>School/College</Col>
              <Col md={2}>Board/University</Col>
              <Col md={2}>Year</Col>
              <Col md={2}>%</Col>
              <Col md={1}>Action</Col>
            </Row>

            {educations.map((edu, index) => {
              const tenthYear = educations.find(
                (e) => e.qualification === "10th"
              )?.year;
              const startYear = 1989;
              const endYear = new Date().getFullYear();

              const yearList = Array.from(
                { length: endYear - startYear },
                (_, i) => `${startYear + i}-${startYear + i + 1}`
              );

              const filteredYears =
                edu.qualification !== "10th" && tenthYear
                  ? yearList.filter((y) => {
                      const yearStart = parseInt(y.split("-")[0], 10); // start year from current option
                      const tenthStart = parseInt(tenthYear.split("-")[0], 10); // start year from 10th selection
                      return yearStart > tenthStart;
                    })
                  : yearList;

              const allQualifications = [
                { value: "10th", label: "10th" },
                { value: "12th", label: "12th" },
                { value: "Diploma", label: "Diploma" },
                { value: "Graduation", label: "Graduation" },
                { value: "Post Graduation", label: "Post Graduation/Master" },
              ];

              // These should always be allowed regardless of selection in distanceCourse
              const alwaysInclude = [
                "10th",
                "12th",
                "Diploma",
                "Graduation",
                "Post Graduation",
              ];

              const availableQualifications = allQualifications.filter(
                (q) =>
                  alwaysInclude.includes(q.value) ||
                  !distanceCourse.some((dc) => dc.value === q.value)
              );

              return (
                <Row key={index} className="mb-2">
                  <Col md={2} className="Qualification-option">
                    <Form.Select
                      value={edu.qualification}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "qualification",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select</option>
                      {availableQualifications.map((q) => (
                        <option key={q.value} value={q.value}>
                          {q.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    {edu.qualification === "Graduation" ||
                    edu.qualification === "Post Graduation" ? (
                      <Form.Select
                        className="mb-2"
                        value={edu.courseDetail || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "courseDetail",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select Course</option>
                        {edu.qualification === "Graduation" &&
                          ["BA", "BTech", "BSc", "BCom"].map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        {edu.qualification === "Post Graduation" &&
                          [
                            "MA",
                            "MTech",
                            "MSc",
                            "MCom",
                            "MBA",
                            "MCA",
                            "PhD",
                          ].map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                      </Form.Select>
                    ) : (
                      <Form.Control
                        className="mb-2"
                        placeholder="School/College"
                        value={edu.school || ""}
                        required
                        onChange={(e) =>
                          handleEducationChange(index, "school", e.target.value)
                        }
                      />
                    )}
                  </Col>
                  <Col md={2}>
                    <Form.Select
                      value={edu.board}
                      className="mb-2"
                      required
                      onChange={(e) =>
                        handleEducationChange(index, "board", e.target.value)
                      }
                    >
                      <option value="">Select Board</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="State Board">State Board</option>
                      <option value="Uttarakhand Technical University (UTU)">
                        Uttarakhand Technical University (UTU)
                      </option>
                      <option value="Maya Group of Colleges">
                        Maya Group of Colleges
                      </option>
                      <option value="DIT University">
                        Graphic Era University
                      </option>
                      <option value="HNB Garhwal University">
                        HNB Garhwal University
                      </option>
                      <option value="Quantum University">
                        Quantum University
                      </option>
                      <option value="UPES Dehradun">UPES Dehradun</option>
                      <option value="Tulas Institute">Tulas Institute</option>
                      <option value="Dev Bhoomi Uttarakhand University">
                        Dev Bhoomi Uttarakhand University
                      </option>
                      <option value="Alpine Institute of Management & Technology">
                        Alpine Institute of Management & Technology
                      </option>
                      <option value="Shivalik College of Engineering">
                        Shivalik College of Engineering
                      </option>
                      <option value="BFIT Group of Institutions">
                        BFIT Group of Institutions
                      </option>
                      <option value="Beehive College of Engineering and Technology">
                        Beehive College of Engineering and Technology
                      </option>
                      <option value="Amrapali Group of Institutes">
                        Amrapali Group of Institutes
                      </option>
                      <option value="IMS Unison University">
                        IMS Unison University
                      </option>
                      <option value="GRD Institute of Management & Technology">
                        GRD Institute of Management & Technology
                      </option>
                    </Form.Select>
                    {edu.board === "Other" && (
                      <Form.Control
                        type="text"
                        placeholder="Enter Board Name"
                        className="mt-2"
                        value={edu.otherBoard || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "otherBoard",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </Col>
                  <Col md={2}>
                    <Form.Select
                      className="mb-2"
                      value={edu.year}
                      required
                      onChange={(e) =>
                        handleEducationChange(index, "year", e.target.value)
                      }
                    >
                      <option value="">Select Year</option>
                      {filteredYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      className="mb-2"
                      value={edu.percentage}
                      required
                      placeholder="%"
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // keep only digits
                        if (value === "") {
                          handleEducationChange(index, "percentage", ""); // allow empty
                          return;
                        }
                        let num = parseInt(value, 10);

                        // Only allow numbers from 0 to 100
                        if (num > 100) {
                          num = 100;
                        }

                        handleEducationChange(
                          index,
                          "percentage",
                          num.toString()
                        );
                      }}
                    />
                  </Col>

                  <Col md={1}>
                    <Button
                      variant="danger"
                      className="mb-2 education-delete-btn"
                      onClick={() => removeEducation(index)}
                    >
                      ✕
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </div>

          <Row className="mt-3 ">
            <Col md={6} lg={6} sm={12}>
              <Form.Group className="mob-resume-create">
                <Form.Label>
                  <strong>Course Type</strong>
                </Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Full Time"
                    type="radio"
                    name="courseType"
                    value="full"
                    checked={courseType === "full"}
                    onChange={(e) => {
                      setCourseType(e.target.value);
                      setDistanceCourse([]);
                    }}
                  />
                  <Form.Check
                    inline
                    label="Distance Learning"
                    type="radio"
                    name="courseType"
                    value="distance"
                    checked={courseType === "distance"}
                    onChange={(e) => setCourseType(e.target.value)}
                  />
                </div>

                {courseType === "distance" && (
                  <>
                    {(() => {
                      const filledQuals = [];
                      const seen = new Set();

                      educations.forEach((edu) => {
                        const q = edu.qualification;
                        const board = edu.board;
                        const year = edu.year;
                        const percentage = edu.percentage;

                        if (q && board && year && percentage && !seen.has(q)) {
                          let label = q;
                          if (q === "Post Graduation")
                            label = "Post Graduation/Master";
                          filledQuals.push({ value: q, label });
                          seen.add(q);
                        }
                      });

                      if (filledQuals.length > 0) {
                        return (
                          <Select
                            className="mt-2"
                            isMulti
                            options={filledQuals}
                            value={distanceCourse}
                            onChange={(selected) =>
                              setDistanceCourse(selected || [])
                            }
                            placeholder="Select distance learning courses"
                            required
                          />
                        );
                      } else {
                        return (
                          <div className="text-muted text-mute-style mt-2">
                            Please complete at least one qualification (e.g.,
                            10th, 12th, etc.) above to select distance learning
                            courses.
                          </div>
                        );
                      }
                    })()}
                  </>
                )}
              </Form.Group>
            </Col>

            <Col md={6} lg={6} sm={12}>
              <Form.Group className="mob-resume-create">
                <Form.Label>
                  <strong>Languages</strong>
                </Form.Label>
                <Select
                  isMulti
                  options={languageOptions}
                  value={selectedLanguages}
                  onChange={handleLanguageChange}
                  placeholder="Select languages"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mob-resume-create mb-2">
            <Form.Label className="label-title">Hobbies</Form.Label>
            <Form.Control
              type="text"
              placeholder="Reading, Cricket, etc."
              value={formData.hobbies}
              onChange={(e) => handleInputChange("hobbies", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2 mob-resume-create">
            <Form.Label>Upload Profile photo</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {formData.photo && (
              <img
                src={`${BASE_URLL.replace(/\/$/, "")}/${formData.photo.replace(
                  /^\//,
                  ""
                )}`}
                alt="User Preview"
                width="120"
                height="120"
                className="mt-2 rounded-circle"
              />
            )}
          </Form.Group>

          <Form.Group className="mb-2 mob-resume-create">
            <Form.Label>Key Skills</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formData.skills}
              onChange={(e) => handleInputChange("skills", e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4 mob-resume-create">
            <Form.Label>Proffesional Experience</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              value={formData.Proffesional_experience}
              onChange={(e) =>
                handleInputChange("Proffesional_experience", e.target.value)
              }
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit Form
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Profile;
