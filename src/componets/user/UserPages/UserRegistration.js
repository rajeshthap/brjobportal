import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { FaBriefcase, FaUserGraduate, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { registerUser, googleLogin } from "../../../api/auth";
import RegisterImg from "../../../assets/images/register-img.jpeg";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import axios from "axios";

const UserRegistration = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const phoneRef = useRef(null);
  const dobRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    workStatus: "",
    experience: "",
    photo: "",
    fresherNote: "",
    Date_of_Birth: "",
    Gender: "",
    resume: null,
  });

  // Autofill Google data if present
  useEffect(() => {
    const stored = localStorage.getItem("googleUser");
    if (stored) {
      const user = JSON.parse(stored);
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        photo: user.picture || "",
      }));
    }
  }, []);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Focus specific input on validation failure
  const focusField = (field) => {
    switch (field) {
      case "name": nameRef.current?.focus(); break;
      case "email": emailRef.current?.focus(); break;
      case "password": passwordRef.current?.focus(); break;
      case "confirmPassword": confirmPasswordRef.current?.focus(); break;
      case "phone": phoneRef.current?.focus(); break;
      case "Date_of_Birth": dobRef.current?.focus(); break;
      default: break;
    }
  };

  // Validation function
  const validateForm = () => {
    if (!formData.name || !/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(formData.name)) {
      setErrorMessages({ name: "Name must contain only letters and spaces." });
      focusField("name");
      return false;
    }
    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setErrorMessages({ email: "Enter a valid email address." });
      focusField("email");
      return false;
    }
    if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+]).{8,}$/.test(formData.password)) {
      setErrorMessages({ password: "Password must be 8+ characters with uppercase, lowercase, number, and symbol." });
      focusField("password");
      return false;
    }
    if (!formData.confirmPassword || formData.confirmPassword !== formData.password) {
      setErrorMessages({ confirmPassword: "Passwords do not match." });
      focusField("confirmPassword");
      return false;
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      setErrorMessages({ phone: "Phone must be exactly 10 digits." });
      focusField("phone");
      return false;
    }
    if (!formData.Date_of_Birth) {
      setErrorMessages({ Date_of_Birth: "Date of birth is required." });
      focusField("Date_of_Birth");
      return false;
    } else if (new Date(formData.Date_of_Birth) > new Date()) {
      setErrorMessages({ Date_of_Birth: "Date of birth cannot be in the future." });
      focusField("Date_of_Birth");
      return false;
    }
    if (!formData.Gender) {
      setErrorMessages({ Gender: "Please select gender." });
      return false;
    }
    if (!formData.workStatus) {
      setErrorMessages({ workStatus: "Please select your work status." });
      return false;
    }
    if (formData.workStatus === "experienced" && !formData.experience) {
      setErrorMessages({ experience: "Please select experience." });
      return false;
    }
    if (!formData.photo) {
      setErrorMessages({ photo: "Please upload your photo." });
      return false;
    }
    setErrorMessages({});
    return true;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    let newValue = type === "file" ? files[0] : value;
    if (name === "phone") newValue = value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, [name]: newValue });
    setErrorMessages({});
  };

  const handleWorkStatus = (status) => {
    setFormData({ ...formData, workStatus: status, experience: "", fresherNote: "" });
    setErrorMessages({});
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, photo: file });
    setErrorMessages({});
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = { name: decoded.name, email: decoded.email, picture: decoded.picture };
      localStorage.setItem("googleUser", JSON.stringify(userData));
      setFormData((prev) => ({ ...prev, name: userData.name, email: userData.email, photo: userData.picture }));
      const data = await googleLogin({ token: credentialResponse.credential });
      localStorage.setItem("job_user_id", data.user_id);
    } catch (err) {
      console.error("Google login error:", err);
      alert(err?.response?.data?.detail || "Google login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submission = new FormData();
      for (let key in formData) {
        if (key === "confirmPassword") continue;
        if (key === "photo") {
          if (formData.photo instanceof File) submission.append("photo", formData.photo);
          else if (typeof formData.photo === "string" && formData.photo.startsWith("http")) {
            const response = await fetch(formData.photo);
            const blob = await response.blob();
            submission.append("photo", new File([blob], "google-photo.jpg", { type: blob.type }));
          }
          continue;
        }
        if (formData[key] !== null && formData[key] !== "") submission.append(key, formData[key]);
      }

      const response = await registerUser(submission, "registration");
      const userId = response?.id || response?.user?.id;
      if (!userId) throw new Error("User ID not returned");

      localStorage.setItem("userRegistrationData", JSON.stringify({ ...formData, id: userId }));
      localStorage.setItem("autoId", userId);

      await axios.post(`${BASE_URLL}api/Send-otp/`, { phone: formData.phone });

      alert("Registered successfully! OTP sent to your phone.");
      navigate("/UserVerifyOtp", { state: { phone: formData.phone, userId } });

    } catch (error) {
      console.error("Registration error:", error);
      if (error && typeof error === "object") {
        const backendErrors = {};
        if (error.email) { backendErrors.email = error.email[0]; focusField("email"); }
        if (error.phone) { backendErrors.phone = error.phone[0]; if (!backendErrors.email) focusField("phone"); }
        setErrorMessages(backendErrors);
      } else {
        alert("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-box container training-wrapper mt-4">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={7}>
            <h4 className="fw-bold">Registration</h4>
            <p className="text-muted mb-4">Create your account now</p>

            {/* Full Name */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name<span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="name" value={formData.name} ref={nameRef} onChange={handleInputChange} required />
              {errorMessages.name && <div className="text-danger">{errorMessages.name}</div>}
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email ID<span className="text-danger">*</span></Form.Label>
              <Form.Control type="email" name="email" value={formData.email} ref={emailRef} onChange={handleInputChange} required />
              {errorMessages.email && <div className="text-danger">{errorMessages.email}</div>}
            </Form.Group>

            {/* Password */}
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password <span className="text-danger">*</span></Form.Label>
              <InputGroup>
                <Form.Control type={showPassword ? "text" : "password"} name="password" value={formData.password} ref={passwordRef} onChange={handleInputChange} required />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>{showPassword ? <FaEyeSlash /> : <FaEye />}</InputGroup.Text>
              </InputGroup>
              {errorMessages.password && <div className="text-danger">{errorMessages.password}</div>}
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
              <InputGroup>
                <Form.Control type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} ref={confirmPasswordRef} onChange={handleInputChange} required />
                <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: "pointer" }}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</InputGroup.Text>
              </InputGroup>
              {errorMessages.confirmPassword && <div className="text-danger">{errorMessages.confirmPassword}</div>}
            </Form.Group>

            {/* Phone */}
            <Form.Group className="mb-3">
              <Form.Label>Phone Number<span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} ref={phoneRef} onChange={handleInputChange} maxLength={10} required />
              {errorMessages.phone && <div className="text-danger">{errorMessages.phone}</div>}
            </Form.Group>

            {/* Date of Birth */}
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth<span className="text-danger">*</span></Form.Label>
              <Form.Control type="date" name="Date_of_Birth" value={formData.Date_of_Birth} ref={dobRef} onChange={handleInputChange} required />
              {errorMessages.Date_of_Birth && <div className="text-danger">{errorMessages.Date_of_Birth}</div>}
            </Form.Group>

            {/* Gender */}
            <Form.Group className="mb-3">
              <Form.Label>Gender<span className="text-danger">*</span></Form.Label>
              <div className="d-flex gap-3">
                <Form.Check type="radio" label="Male" name="Gender" value="male" checked={formData.Gender === "male"} onChange={handleInputChange} />
                <Form.Check type="radio" label="Female" name="Gender" value="female" checked={formData.Gender === "female"} onChange={handleInputChange} />
              </div>
              {errorMessages.Gender && <div className="text-danger">{errorMessages.Gender}</div>}
            </Form.Group>

            {/* Work Status */}
            <Form.Group className="mb-3">
              <Form.Label>Work Status <span className="text-danger">*</span></Form.Label>
              <div className="d-flex gap-3 mt-2">
                <div className={`work-card ${formData.workStatus === "experienced" ? "active" : ""}`} onClick={() => handleWorkStatus("experienced")} style={{ cursor: "pointer" }}>
                  <button className="reg-btn"><FaBriefcase className="me-2" /> I'm experienced</button>
                </div>
                <div className={`work-card ${formData.workStatus === "fresher" ? "active" : ""}`} onClick={() => handleWorkStatus("fresher")} style={{ cursor: "pointer" }}>
                  <button className="reg-btn"><FaUserGraduate className="me-2" /> I'm a fresher</button>
                </div>
              </div>
              {errorMessages.workStatus && <div className="text-danger">{errorMessages.workStatus}</div>}
              {formData.workStatus === "fresher" && <Form.Control type="text" className="mt-3" placeholder="fresher" value={formData.fresherNote} onChange={(e) => setFormData({ ...formData, fresherNote: e.target.value })} />}
            </Form.Group>

            {/* Experience */}
            {formData.workStatus === "experienced" && (
              <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Select name="experience" value={formData.experience} onChange={handleInputChange} required>
                  <option value="">Select experience</option>
                  {[...Array(20).keys()].map(i => <option key={i+1} value={`${i+1} year${i !== 0 ? "s" : ""}`}>{i+1} year{i !== 0 ? "s" : ""}</option>)}
                </Form.Select>
                {errorMessages.experience && <div className="text-danger">{errorMessages.experience}</div>}
              </Form.Group>
            )}

            {/* Photo */}
            <Form.Group className="mb-3">
              <Form.Label>Upload Photo<span className="text-danger">*</span></Form.Label>
              {formData.photo && typeof formData.photo === "string" && <img src={formData.photo} alt="Google Profile" width={100} className="rounded-circle mb-2" />}
              {formData.photo instanceof File && <img src={URL.createObjectURL(formData.photo)} alt="Preview" width={100} className="rounded-circle mb-2" />}
              <Form.Control type="file" accept="image/*" onChange={handlePhotoChange} />
              {errorMessages.photo && <div className="text-danger">{errorMessages.photo}</div>}
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mt-3 d-flex justify-content-center align-items-center btn-register" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Registering...</> : "Register Now"}
            </Button>
          </Col>

          <Col md={5} className=" d-md-block text-center mt-2">
            <GoogleOAuthProvider clientId="800801519585-qmph1r52j24jc6vav2vvctbbqbe9iini.apps.googleusercontent.com">
              <div className="text-center">
                <GoogleLogin onSuccess={handleGoogleLogin} onError={() => alert("Login Failed")} />
              </div>
            </GoogleOAuthProvider>
            <div className="img-none-mobile">
              <img src={RegisterImg} alt="Register" className="img-fluid mb-3" />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserRegistration;
