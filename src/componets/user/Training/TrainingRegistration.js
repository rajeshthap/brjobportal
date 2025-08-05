import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";

const TrainingRegistration = () => {
  const location = useLocation();
  const stateData = location.state || {};
  console.log("statedata", stateData)
  const [formData, setFormData] = useState({
    training_name: "",
    training_description: "",
    training_date: "",
    training_duration: "",
    candidate_name: "",
    candidate_email: "",
    candidate_phone: "",
    training_id: "T_id_01",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const stateData = location.state || {}; // move inside
    const today = new Date().toISOString().slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      training_date: today,
      training_duration: "6 months",
      training_name: stateData.training_name || "",
      training_description: stateData.training_description || "",
    }));
  }, [location.state]);


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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = {
        training_name: formData.training_name,
        training_description: formData.training_description,
        training_date: formData.training_date,
        training_duration: formData.training_duration,
        candidate_name: formData.candidate_name,
        candidate_email: formData.candidate_email,
        candidate_phone: formData.candidate_phone,
        Training_id: "1",
      };

      const response = await axios.post(
        `${BASE_URLL}/api4/training_user/`,
        payload
      );

      console.log("Training res:", response.data);
      setSuccessMsg("Training registration successful!");

      setFormData({
        training_name: "",
        training_description: "",
        training_date: new Date().toISOString().slice(0, 10),
        training_duration: "6 months",
        candidate_name: "",
        candidate_email: "",
        candidate_phone: "",
        training_id: "1",
      });
    } catch (error) {
      console.error(error);
      if (error.response?.data?.error) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className=" edit-main">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-lg">
            <h4 className="text-center mb-4">Training Registration</h4>

            {successMsg && <Alert variant="success">{successMsg}</Alert>}
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Training Name</Form.Label>
                <Form.Select
                  name="training_name"
                  value={formData.training_name}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Training --</option>
                  <option value="Python Bootcamp">Python Bootcamp</option>
                  <option value="React Training Program">React Training Program</option>
                  <option value="Machine Learning">Machine Learning</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Training Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="training_description"
                  value={formData.training_description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Training Date</Form.Label>
                <Form.Control
                  type="date"
                  name="training_date"
                  value={formData.training_date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Training Duration</Form.Label>
                <Form.Control
                  type="text"
                  name="training_duration"
                  value={formData.training_duration}
                  onChange={handleChange}
                  placeholder="e.g. 2 weeks"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="candidate_name"
                  value={formData.candidate_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="candidate_email"
                  value={formData.candidate_email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label> Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="candidate_phone"
                  value={formData.candidate_phone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit phone number"
                />
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
    </Container>
  );
};

export default TrainingRegistration;
