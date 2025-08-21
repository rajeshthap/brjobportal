import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUserT, sendOtp } from "../../../api/auth";
import axios from "axios";

const TrainingRegistration = () => {
  const candidate_phoneRef = useRef(null);
  const candidate_emailRef = useRef(null);

  const location = useLocation();
  const stateData = location.state || {};
  const navigate = useNavigate();

  const [trainingCounter, setTrainingCounter] = useState(1);
  const [formData, setFormData] = useState({
    training_name: "",
    training_description: "",
    training_date: "",
    training_duration: "6 months",
    candidate_name: "", // <-- fixed key
    candidate_email: "",
    candidate_phone: "",
    Date_of_Birth: "",
    Gender: "",
    password: "",
    confirm_password: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setFormData((prev) => ({
      ...prev,
      training_date: today,
      training_name: stateData.training_name || prev.training_name,
      training_description: stateData.training_description || prev.training_description,
    }));

    const savedCounter = parseInt(localStorage.getItem("trainingCounter") || "1", 10);
    setTrainingCounter(savedCounter);
  }, [stateData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "candidate_phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, photo: file });
  };

  const validateForm = () => {
    const errors = {};
    const { candidate_name, candidate_email, candidate_phone, training_name, training_description, Date_of_Birth, Gender, password, confirm_password, photo } = formData;

    if (!candidate_name || !/^[A-Za-z\s]+$/.test(candidate_name)) errors.candidate_name = "Name must contain only letters.";
    if (!candidate_email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(candidate_email)) errors.candidate_email = "Enter a valid email.";
    if (!candidate_phone || candidate_phone.length !== 10) errors.candidate_phone = "Phone must be 10 digits.";
    if (!training_name) errors.training_name = "Select training.";
    if (!training_description || training_description.length < 10) errors.training_description = "Description min 10 characters.";
    if (!Date_of_Birth) errors.Date_of_Birth = "Date of Birth required.";
    if (!Gender) errors.Gender = "Gender required.";
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password || !passwordPattern.test(password)) errors.password = "Password must contain uppercase, lowercase, number & special char.";
    if (confirm_password !== password) errors.confirm_password = "Passwords do not match.";
    if (!photo) errors.photo = "Photo is required.";

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!validateForm()) return;

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    const candidate_emailExists = registeredUsers.some(
      (u) => u.candidate_email === formData.candidate_email && u.training_name === formData.training_name
    );
    const candidate_phoneExists = registeredUsers.some(
      (u) => u.candidate_phone === formData.candidate_phone && u.training_name === formData.training_name
    );

    if (candidate_emailExists) {
      alert("This email is already registered for this training!");
      candidate_emailRef.current?.focus();
      return;
    }

    if (candidate_phoneExists) {
      alert("This phone is already registered for this training!");
      candidate_phoneRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      const candidate_phoneTrainingMap = JSON.parse(localStorage.getItem("candidate_phoneTrainingMap") || "{}");
      let currentTrainingId;

      if (candidate_phoneTrainingMap[formData.candidate_phone]) {
        currentTrainingId = candidate_phoneTrainingMap[formData.candidate_phone];
      } else {
        const nextCounter = Math.min(trainingCounter, 12);
        currentTrainingId = `T_id_${String(nextCounter).padStart(2, "0")}`;
        candidate_phoneTrainingMap[formData.candidate_phone] = currentTrainingId;
        localStorage.setItem("candidate_phoneTrainingMap", JSON.stringify(candidate_phoneTrainingMap));

        if (trainingCounter < 12) {
          localStorage.setItem("trainingCounter", String(trainingCounter + 1));
          setTrainingCounter(trainingCounter + 1);
        }
      }

      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          payload.append(key, formData[key]);
        }
      });
      payload.append("Training_id", currentTrainingId);

      await registerUserT(payload, "training");
      await sendOtp(formData.candidate_phone);

      registeredUsers.push({
        candidate_email: formData.candidate_email,
        candidate_phone: formData.candidate_phone,
        training_name: formData.training_name,
      });
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      localStorage.setItem("candidate_phone", formData.candidate_phone);

      alert("Training registration successful! OTP sent.");
      navigate("/TrainingVerifyOtp");

      setFormData({
        training_name: "",
        training_description: "",
        training_date: new Date().toISOString().slice(0, 10),
        training_duration: "6 months",
        candidate_name: "",
        candidate_email: "",
        candidate_phone: "",
        Date_of_Birth: "",
        Gender: "",
        password: "",
        confirm_password: "",
        photo: null,
      });
      setErrorMessages({});
    } catch (error) {
      console.error(error);
      const fieldErrors = {};
      if (error.candidate_email) fieldErrors.candidate_email = error.candidate_email[0];
      if (error.candidate_phone) fieldErrors.candidate_phone = error.candidate_phone[0];
      setErrorMessages((prev) => ({ ...prev, ...fieldErrors }));
      setErrorMsg(error.error || "Something went wrong. Try again.");
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
                  <option value="HTML, CSS & Bootstrap Training">HTML, CSS & Bootstrap Training</option>
                  <option value="Web Development Training">Web Development Training</option>
                  <option value="UI/UX Designer Training">UI/UX Designer Training</option>
                  <option value="Communication Skills Training">Communication Skills Training</option>
                  <option value="Self-Confidence & Power Dressing Training">Self-Confidence & Power Dressing Training</option>
                  <option value="Interview Skills Training Program Outline">Interview Skills Training Program Outline</option>
                  <option value="Public Speaking Training">Public Speaking Training</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errorMessages.training_name}</Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">{errorMessages.training_description}</Form.Control.Feedback>
              </Form.Group>

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
                <Form.Control.Feedback type="invalid">{errorMessages.candidate_name}</Form.Control.Feedback>
              </Form.Group>

              {/* Candidate Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="candidate_email"
                  value={formData.candidate_email}
                  onChange={handleChange}
                  ref={candidate_emailRef}
                  isInvalid={!!errorMessages.candidate_email}
                  required
                />
                <Form.Control.Feedback type="invalid">{errorMessages.candidate_email}</Form.Control.Feedback>
              </Form.Group>

              {/* Candidate Phone */}
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="candidate_phone"
                  ref={candidate_phoneRef}
                  value={formData.candidate_phone}
                  onChange={handleChange}
                  placeholder="10-digit phone"
                  isInvalid={!!errorMessages.candidate_phone}
                  required
                />
                <Form.Control.Feedback type="invalid">{errorMessages.candidate_phone}</Form.Control.Feedback>
              </Form.Group>

              {/* Date of Birth */}
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="Date_of_Birth"
                  value={formData.Date_of_Birth}
                  onChange={handleChange}
                  isInvalid={!!errorMessages.Date_of_Birth}
                  required
                />
                <Form.Control.Feedback type="invalid">{errorMessages.Date_of_Birth}</Form.Control.Feedback>
              </Form.Group>

              {/* Gender */}
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
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
                {errorMessages.Gender && <div className="text-danger">{errorMessages.Gender}</div>}
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errorMessages.password}
                  required
                />
                <Form.Control.Feedback type="invalid">{errorMessages.password}</Form.Control.Feedback>
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  isInvalid={!!errorMessages.confirm_password}
                  required
                />
                <Form.Control.Feedback type="invalid">{errorMessages.confirm_password}</Form.Control.Feedback>
              </Form.Group>

              {/* Photo */}
              <Form.Group className="mb-3">
                <Form.Label>Upload Photo</Form.Label>
                {formData.photo && (
                  <img
                    src={formData.photo instanceof File ? URL.createObjectURL(formData.photo) : formData.photo}
                    alt="Preview"
                    width={100}
                    className="rounded-circle mb-2"
                  />
                )}
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  isInvalid={!!errorMessages.photo}
                  required
                />
                <Form.Control.Feedback type="invalid">{errorMessages.photo}</Form.Control.Feedback>
              </Form.Group>

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
