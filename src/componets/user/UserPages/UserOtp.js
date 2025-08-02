import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";


function UserOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const phoneFromState = location.state?.phone || localStorage.getItem("phone") || "";
  const purpose = location.state?.purpose === "forgot" ? "forgot" : "register";

  const [phone] = useState(phoneFromState);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!phone) {
      setError("Not Found phone number");
    }
  }, [phone]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/UserLogin");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!otp || otp.length < 4) {
      setError("enter the valid otp");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URLL}api/Verify-otp/`, {
        phone,
        otp,
      });

      if (response.status === 200 && response.data.success) {
        localStorage.setItem("phone", phone);
        setSuccess("Otp succefully send...");

        setTimeout(() => {
          const redirectPath =
            purpose === "forgot" ? "/ForgotPassword" : "/ForgotPassword";
          navigate(redirectPath);
        }, 1500);
      } else {
        setError("OTP is not valid");
      }
    } catch (error) {
      console.error("OTP Verify Error:", error);
      setError("OTP faild");
    }
  };

  const goBack = () => navigate("/UserLogin");

  return (
    <Container className="nd-user-reg mt-2">
      <Row>
        <Card>
        <div className="nd-user-otp mt-5">
          <Form>
            <div className="text-center nd-regis-heading">
              <h5 className="mt-2">OTP</h5>
              <div className="countdown-timer"> time: {countdown} Second</div>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Row className="p-3">
              <Col lg={12}>
                <Form.Group className="mb-3 nd-req-text">
                  <Form.Label>
                    Phone <span className="alert-txt">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="shadow1"
                    value={phone}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col lg={12}>
                <Form.Group className="mb-3 nd-req-text">
                  <Form.Label>
                   Send the OTP  <span className="alert-txt">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=" Enter the otp "
                    className="shadow1"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    inputMode="numeric"
                  />
                </Form.Group>
              </Col>

              <div className="nd-registration mt-4 d-flex justify-content-between">
                <Button variant="secondary" className="nd-back-btn" onClick={goBack}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  className="nd-primary-btn nd-primary-btn1"
                  onClick={handleVerifyOtp}
                >
                  OTP Verify
                </Button>
              </div>
            </Row>
          </Form>
        </div>
        </Card>
      </Row>
    </Container>
  );
}

export default UserOtp;
