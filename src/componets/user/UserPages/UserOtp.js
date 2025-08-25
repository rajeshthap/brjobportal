import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import { verifyOTP, resendOTP } from "../../../api/auth";

const UserOtp = () => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [phone,] = useState(localStorage.getItem("phone") || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [TrainingOtpVerify, setTrainingOtpVerify] = useState(false);

  const navigate = useNavigate(); //  hook for redirect

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
      const data = await verifyOTP(phone, otp);
      if (!data || !data.success) {
        setError("Invalid OTP. Please try again.");
        return;
      }
      setSuccess("OTP verified successfully!");

      //  Redirect to forgot password page after 1.5s
      setTimeout(() => {
        navigate("/Forgotpassword");
      }, 1500);
    } catch (err) {
      console.error("OTP Error:", err);
      setError("Invalid OTP. Please try again.");
    }
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

  const handleResend = async () => {
    setError("");
    setSuccess("");
    try {
      await resendOTP(phone);
      setSuccess("OTP resent successfully!");
      setCountdown(60); // Restart countdown
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

              {/* Phone Field */}
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  disabled
                  readOnly
                />
              </Form.Group>

              {/* OTP Field */}
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

              {/* Error and Success Messages */}
              {error && <div className="text-danger mb-2">{error}</div>}
              {success && <div className="text-success mb-2">{success}</div>}

              {/* Buttons */}
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

export default UserOtp;
