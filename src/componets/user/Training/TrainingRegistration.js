import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";

const TrainingRegistration = () => {
  const location = useLocation();
  const stateData = location.state || {};
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [trainingCounter, setTrainingCounter] = useState(1);
  const [formData, setFormData] = useState({
    training_name: "",
    training_description: "",
    training_date: "",
    training_duration: "",
    candidate_name: "",
    candidate_email: "",
    candidate_phone: "",
    training_id: `T_id_${String(1).padStart(2, "0")}`,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

 useEffect(() => {
  const today = new Date().toISOString().slice(0, 10);

  setFormData(prev => ({
    ...prev,
    training_date: today,
    training_duration: "6 months",
    training_name: stateData.training_name || prev.training_name,
    training_description: stateData.training_description || prev.training_description,
  }));

  const savedMapping = JSON.parse(localStorage.getItem("phoneTrainingMap") || "{}");
  const savedCounter = parseInt(localStorage.getItem("trainingCounter") || "1", 10);
  setTrainingCounter(savedCounter);
}, []); // runs only once on mount
 // <-- run only once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "candidate_phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const data = formData;
    const errors = {};
    const fieldOrder = [
      "candidate_name",
      "candidate_email",
      "candidate_phone",
      "training_name",
      "training_description",
      "training_date",
      "training_duration",
    ];

    for (const field of fieldOrder) {
      switch (field) {
        case "candidate_name":
          if (!data.candidate_name || !/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(data.candidate_name)) {
            errors.candidate_name = "Name must contain only letters and spaces.";
          }
          break;
        case "candidate_email":
          if (
            !data.candidate_email ||
            !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.candidate_email)
          ) {
            errors.candidate_email = "Enter a valid email address.";
          }
          break;
        case "candidate_phone":
          if (!data.candidate_phone || !/^\d{10}$/.test(data.candidate_phone)) {
            errors.candidate_phone = "Phone must be exactly 10 digits.";
          }
          break;
        case "training_name":
          if (!data.training_name) {
            errors.training_name = "Please select training.";
          }
          break;
        case "training_description":
          if (!data.training_description || data.training_description.length < 10) {
            errors.training_description = "Description must be at least 10 characters.";
          }
          break;
        case "training_date":
          if (!data.training_date) {
            errors.training_date = "Date is required.";
          }
          break;
        case "training_duration":
          if (!data.training_duration) {
            errors.training_duration = "Duration is required.";
          }
          break;
        default:
          break;
      }
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };
 const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updated = { ...formData, photo: file };
      setFormData(updated);
      setErrorMessages({});
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccessMsg("");
  setErrorMsg("");

  const isValid = validateForm();
  if (!isValid) return;

  // --- New check: email+training combination ---
  const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
  const alreadyRegistered = registeredUsers.some(
    (u) =>
      u.candidate_email === formData.candidate_email &&
      u.training_name === formData.training_name
  );
  if (alreadyRegistered) {
    alert("This email is already registered for this training!");
    if (emailRef.current) emailRef.current.focus();
    return;
  }

  setLoading(true);

  try {
    const phoneTrainingMap = JSON.parse(localStorage.getItem("phoneTrainingMap") || "{}");
    let currentTrainingId;

    if (phoneTrainingMap[formData.candidate_phone]) {
      currentTrainingId = phoneTrainingMap[formData.candidate_phone];
    } else {
      const nextCounter = Math.min(trainingCounter, 12);
      currentTrainingId = `T_id_${String(nextCounter).padStart(2, "0")}`;

      phoneTrainingMap[formData.candidate_phone] = currentTrainingId;
      localStorage.setItem("phoneTrainingMap", JSON.stringify(phoneTrainingMap));

      if (trainingCounter < 12) {
        localStorage.setItem("trainingCounter", String(trainingCounter + 1));
        setTrainingCounter(trainingCounter + 1);
      }
    }

    const payload = {
      training_name: formData.training_name,
      training_description: formData.training_description,
      training_date: formData.training_date,
      training_duration: formData.training_duration,
      candidate_name: formData.candidate_name,
      candidate_email: formData.candidate_email,
      candidate_phone: formData.candidate_phone,
      Training_id: currentTrainingId,
    };

    await axios.post(`${BASE_URLL}api4/training_user/`, payload);
    await axios.post(`${BASE_URLL}api/Send-otp/`, { phone: formData.candidate_phone });

    // --- Store email+training combination locally ---
    registeredUsers.push({
      candidate_email: formData.candidate_email,
      training_name: formData.training_name,
    });
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    localStorage.setItem("candidate_phone", formData.candidate_phone);

    alert("Training registration successful! OTP sent to phone.");
    navigate("/TrainingVerifyOtp");
    console.log("Training registration data:", payload);

    setFormData({
      training_name: "",
      training_description: "",
      training_date: new Date().toISOString().slice(0, 10),
      training_duration: "6 months",
      candidate_name: "",
      candidate_email: "",
      candidate_phone: "",
      training_id: currentTrainingId,
    });
    setErrorMessages({});
  } catch (error) {
    console.error(error);
    const data = error.response?.data || {};
    const fieldErrors = {};

    if (data.candidate_email) {
      fieldErrors.candidate_email = data.candidate_email[0];
      alert("This email is already registered!");
      if (emailRef.current) emailRef.current.focus();
    }
    if (data.candidate_phone) {
      fieldErrors.candidate_phone = data.candidate_phone[0];
    }

    setErrorMessages((prev) => ({ ...prev, ...fieldErrors }));

    if (data.error) {
      setErrorMsg(data.error);
    } else if (!Object.keys(fieldErrors).length) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="edit-main-heading">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-lg">
            <h4 className="text-center mb-4">Training Registration</h4>

            {successMsg && <Alert variant="success">{successMsg}</Alert>}
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Training Name */}
              <Form.Group className="mb-3">
                <Form.Label>Training Name</Form.Label>
                <Form.Select
                  name="training_name"
                  value={formData.training_name}
                  onChange={handleChange}
                  isInvalid={!!errorMessages.training_name}
                  required
                >
                  <option value="">-- Select Training --</option>
                  <option value="React Training">React Training</option>
                  <option value="Python Training Program">Python Training</option>
                  <option value="PHP Training">PHP Training</option>
                  <option value="MySQL Training">MySQL Training</option>
                  <option value="HTML, CSS & Bootstrap Training">
                    HTML, CSS & Bootstrap Training
                  </option>
                  <option value="Web Development Training">Web Development Training</option>
                  <option value="UI/UX Designer Training">UI/UX Designer Training</option>
                  <option value="Communication Skills Training">
                    Communication Skills Training
                  </option>
                  <option value="Self-Confidence & Power Dressing Training">
                    Self-Confidence & Power Dressing Training
                  </option>
                  <option value="Interview Skills Training Program Outline">
                    Interview Skills Training Program Outline
                  </option>
                  <option value="Public Speaking Training">Public Speaking Training</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errorMessages.training_name}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Training Description */}
              <Form.Group className="mb-3">
                <Form.Label>Training Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="training_description"
                  value={formData.training_description}
                  onChange={handleChange}
                  isInvalid={!!errorMessages.training_description}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.training_description}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Training Date */}
              <Form.Group className="mb-3">
                <Form.Label>Training Date</Form.Label>
                <Form.Control
                  type="date"
                  name="training_date"
                  value={formData.training_date}
                  disabled
                  onChange={handleChange}
                  isInvalid={!!errorMessages.training_date}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.training_date}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Training Duration */}
           

              {/* Candidate Name */}
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="candidate_name"
                  value={formData.candidate_name}
                  onChange={handleChange}
                  isInvalid={!!errorMessages.candidate_name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.candidate_name}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Candidate Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="candidate_email"
                  value={formData.candidate_email}
                  onChange={handleChange}
                  ref={emailRef}
                  required
                />
                {errorMessages.candidate_email && (
                  <span style={{ color: "red", fontSize: "0.875rem" }}>
                    email already exists {errorMessages.candidate_email}
                  </span>
                )}
              </Form.Group>

              {/* Candidate Phone */}
              <Form.Group className="mb-4">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="candidate_phone"
                  value={formData.candidate_phone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  isInvalid={!!errorMessages.candidate_phone}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.candidate_phone}
                </Form.Control.Feedback>
              </Form.Group>
  <Form.Group className="mb-3">
              <Form.Label>
                Date of Birth<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                name="Date_of_Birth"
                value={formData.Date_of_Birth}
                 onChange={handleChange}
                required
              />
              {errorMessages.Date_of_Birth && (
                <div className="text-danger">{errorMessages.Date_of_Birth}</div>
              )}
            </Form.Group>
             <Form.Group className="mb-3">
                          <Form.Label>
                            Gender<span className="text-danger">*</span>
                          </Form.Label>
                          <div className="d-flex gap-3">
                            <Form.Check
                              type="radio"
                              label="Male"
                              name="Gender"
                              value="male"
                              checked={formData.Gender === "male"}
                              onChange={handleChange}
                              required
                            />
                            <Form.Check
                              type="radio"
                              label="Female"
                              name="Gender"
                              value="female"
                              checked={formData.Gender === "female"}
                              onChange={handleChange}
                            />
                          </div>
                          {errorMessages.Gender && (
                            <div className="text-danger">{errorMessages.Gender}</div>
                          )}
                        </Form.Group>

                         <Form.Group className="mb-3">
                                      <Form.Label>
                                        Upload Photo<span className="text-danger">*</span>
                                      </Form.Label>
                                      {formData.photo && typeof formData.photo === "string" && (
                                        <img
                                          src={formData.photo}
                                          alt="Google Profile"
                                          width={100}
                                          className="rounded-circle mb-2"
                                        />
                                      )}
                                      {formData.photo instanceof File && (
                                        <img
                                          src={URL.createObjectURL(formData.photo)}
                                          alt="Preview"
                                          width={100}
                                          className="rounded-circle mb-2"
                                        />
                                      )}
                                      <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                      />
                                      {errorMessages.photo && (
                                        <div className="text-danger">{errorMessages.photo}</div>
                                      )}
                                    </Form.Group>
              {/* Submit Button */}
              <div className="text-center">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TrainingRegistration;
