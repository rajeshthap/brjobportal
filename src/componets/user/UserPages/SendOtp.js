import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";

function SendOtp() {
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!phone.trim()) {
      newErrors.phone = "phone number Required";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "Please enter valid Indian mobile number (starting with 6-9 and 10 digits long)।";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!validateForm()) return;

    try {
      const response = await axios.post(`${BASE_URLL}api/Send-otp/`, {
        phone: phone,
      });

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("phone", phone);
        setSuccessMsg("OTP Succefully send");
        setTimeout(() => {
          navigate("/UserOtp", { state: { phone: phone, purpose: "forgot" } });
        }, 1500);
      } else {
        alert("Otp faild।");
      }
    } catch (error) {
      console.error("OTP API Error:", error);
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <Container className="">
      <Row className="justify-content-center">
        <Col md={6} className="forgot-password-container">
          <h4 className="text-center mt-3">Forgot Password</h4>
          <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
            <Form.Group className="mb-3">
              <Form.Label>User Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the 10 digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            {successMsg && (
              <Alert variant="success" className="text-center">{successMsg}</Alert>
            )}

            <div className="text-center p-3">
              <Button type="submit" variant="primary" className="px-4">
                OTP Send
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SendOtp;
