import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import axios from "axios";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import { MdOutlineCancel, MdUpdate } from "react-icons/md";
import { fetchUserProfileById } from "../../../api/auth"; // <-- make sure this works
import AccessRefreshToken from "../../user/Employee/AccessRefreshToken";

const TrainingUpdateProfile = ({ show, onHide, userData, onUpdate }) => {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("access_token1");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    Gender: "",
    Date_of_Birth: "",
    photo: null,
    photoPreview: null,
  });

  // Fetch latest user profile from userId to ensure all fields are correct
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchUserProfileById(userId);
        setFormData({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          Gender: profile.Gender || "",
          Date_of_Birth: profile.Date_of_Birth || "07-08-2025",
          photo: null,
          photoPreview: profile.photo 
            ? (profile.photo.startsWith("http") 
                ? profile.photo 
                : `${BASE_URLL.replace(/\/$/, "")}/${profile.photo.replace(/^\//, "")}`)
            : null,
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    if (show) loadProfile();
  }, [show, userId]);

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
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      window.location.href = "/UserLogin";
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("Gender", formData.Gender);
    submitData.append("Date_of_Birth", formData.Date_of_Birth);
    if (formData.photo) submitData.append("photo", formData.photo);

    try {
      const user_id= localStorage.getItem("user_id");
      const accessToken11= localStorage.getItem("accessToken11")
      const response = await AccessRefreshToken.put(
        `${BASE_URLL}api/update/${user_id}/`,
        submitData,
        {
          headers: {
             Authorization: `Bearer ${accessToken11}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdate(response.data);
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
        <Modal.Title className="text-center edit-heading">
          <h1>Edit Profile</h1>
        </Modal.Title>
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
            <Form.Label>Gender</Form.Label>
            <Form.Control
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="Date_of_Birth"
              value={formData.Date_of_Birth || "07-08-2025"}
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
                className="mt-2" roundedCircle 
                alt="Preview"
              />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" className="px-4 edit-r-btn" onClick={handleSubmit}>
          <MdUpdate className="icon-size" /> Update Profile
        </Button>
        <Button variant="" onClick={onHide} className="px-4 close-btn-btn">
          <MdOutlineCancel className="icon-size" /> Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TrainingUpdateProfile;
