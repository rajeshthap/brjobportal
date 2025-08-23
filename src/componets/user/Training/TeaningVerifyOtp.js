import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { verifyOTP, resendOTP } from "../../../api/auth";

const TeaningVerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Get candidate phone from localStorage on mount
  useEffect(() => {
    const storedPhone = localStorage.getItem("candidate_phone") || "";
    console.log("Fetched phone from localStorage:", storedPhone);
    setPhone(storedPhone);
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || otp.length < 4) {
      setError("Please enter a valid 4 or 6 digit OTP.");
      return;
    }

    try {
      await verifyOTP(phone, otp);
      alert("OTP veryfied Thank you for Registration!");
      navigate("/UserLogin"); // Enable if you want to redirect
    } catch (err) {
      console.error("OTP Error:", err);
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    try {
      await resendOTP(phone);
      setSuccess("OTP resent successfully!");
      setCountdown(60);
    } catch (err) {
      console.error("Resend OTP Error:", err);
      setError("Failed to resend OTP. Try again.");
    }
  };

  return (
    <Container className="nd-user-reg mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="user-verfy-otp p-4">
            <Form onSubmit={handleVerify}>
              <div className="text-center mb-3">
                <h5>Verify OTP</h5>
                <small>Time remaining: {countdown} sec</small>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" value={phone} disabled readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                />
              </Form.Group>

              {error && <div className="text-danger mb-2">{error}</div>}
              {success && <div className="text-success mb-2">{success}</div>}

              <Button variant="primary" type="submit" className="w-100">
                Verify OTP
              </Button>

              <Button
                variant="link"
                className="w-100 mt-2"
                onClick={handleResend}
                disabled={countdown > 0}
              >
                Resend OTP
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeaningVerifyOtp;
