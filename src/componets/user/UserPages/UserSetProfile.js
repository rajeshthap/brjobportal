import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import axios from "axios";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";

const BASE_URL = "http://127.0.0.1:8000";

const UserSetProfile = ({ show, onHide, userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: userData?.full_name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    photo: null,
    photoPreview: userData?.photo?.startsWith("http")
      ? userData.photo
      : `${BASE_URL}${userData?.photo || ""}`,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    if (formData.photo) {
      submitData.append("photo", formData.photo);
    }
    
const accessToken11 = localStorage.getItem("access_token1");
const user_id = localStorage.getItem("user_id")
if (!accessToken11) {
    window.location.href = "/UserLogin";
      
  }
    try {
      const response = await axios.put(
        `${BASE_URLL}api/update/${user_id}/`,
        submitData,
        {
          headers: {
             Authorization: `Bearer ${accessToken11}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdate(response.data); // Notify parent to refresh profile
      alert("Profile updated successfully.");
      onHide(); // Close modal
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Basic Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            {formData.photoPreview && (
              <Image
                src={formData.photoPreview}
                width={100}
                height={100}
                rounded
                className="mt-2"
                alt="Preview"
              />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update Profile
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserSetProfile;
