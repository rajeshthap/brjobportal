import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import axios from "axios";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import { MdOutlineCancel, MdUpdate } from "react-icons/md";



const UserSetProfile = ({ show, onHide, userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: userData?.full_name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    Gender: userData?.Gender || "",
    Date_of_Birth: userData?.Date_of_Birth || "",
    photo: null,
    photoPreview: userData?.photo?.startsWith("http")
      ? userData.photo
      : `${BASE_URLL}${userData?.photo || ""}`,
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
    submitData.append("Gender", formData.Gender);
    submitData.append("Date_of_Birth", formData.Date_of_Birth);
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
        <Modal.Title className="text-center edit-heading"><h1>Edit Profile</h1></Modal.Title>
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
            <Form.Control type="date"
              name="Date_of_Birth"
              value={formData.Date_of_Birth}
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
       
       
         <Button type="submit" variant="" className="px-4 edit-r-btn"onClick={handleSubmit}><MdUpdate className="icon-size" />
                      Update Profile
                    </Button>
                    
                     <Button variant="" onClick={onHide} className="px-4 close-btn-btn"><MdOutlineCancel className="icon-size"  />
          Cancel
        </Button>
       
      </Modal.Footer>
    </Modal>
  );
};

export default UserSetProfile;
