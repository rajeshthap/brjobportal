import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/css/Forgetpassword.css";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import { Container } from "react-bootstrap";

// Helper functions to detect email or phone
const isEmail = (value) => /\S+@\S+\.\S+/.test(value);
const isPhone = (value) => /^\d{10}$/.test(value);

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-fill phone from localStorage
  useEffect(() => {
    const savedPhone = localStorage.getItem("phone");
    if (savedPhone) {
      setFormData((prev) => ({ ...prev, identifier: savedPhone }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setErrors("");
  };
useEffect(() => {
  // Push the current page into history so user can't go back
  window.history.pushState(null, "", window.location.href);

  const handlePopState = () => {
    // Disable back button by re-pushing the same page
    window.history.pushState(null, "", window.location.href);
  };

  // Use lowercase 'popstate'
  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [navigate]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password, confirm_password } = formData;

    if (!identifier || !password || !confirm_password) {
      setErrors("All fields are required.");
      return;
    }

    if (!isEmail(identifier) && !isPhone(identifier)) {
      setErrors("Please enter a valid email or 10-digit phone number.");
      return;
    }

    if (password !== confirm_password) {
      setErrors("Passwords do not match.");
      return;
    }

    const payload = {
      email: isEmail(identifier) ? identifier : "",
      phone: isPhone(identifier) ? identifier : "",
      password: password,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URLL}api/forgetpassword/`, payload);

      setMessage(response.data.message || "Password reset successful.");
      setFormData({ identifier: "", password: "", confirm_password: "" });

      setTimeout(() => {
        navigate("/UserLogin");
      }, 2000);
    } catch (error) {
      setErrors(error.response?.data?.error || "Multiple accounts found with this phone number.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
    <div className="forgot-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="forgot-form">
        <input
          type="text"
          name="identifier"
          placeholder="Enter registered Email or Phone"
          value={formData.identifier}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {message && <p className="success">{message}</p>}
        {errors && <p className="error">{errors}</p>}
      </form>
    </div>
    </Container>
  );
};

export default ForgotPassword;
