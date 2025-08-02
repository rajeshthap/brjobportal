import React, { useState } from "react";
import "../../../custom/Mainstyle.css";
import "../../../assets/css/AdminDashBoard.css";
import "../../../assets/css/AdminInnerDashBoard.css";
import Card from "react-bootstrap/Card";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { MdBarChart } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RiHome2Line } from "react-icons/ri";
import axios from "axios";
import EmployeeLeftNav from "./EmployeeLeftNav";
import JobCard from "../leftnav/JobCard";
import PostJobGetView from "./PostJobGetView";
import UserAppliedJob from "./UserAppliedJob"; // <-- import your component
import { BASE_URLL } from "../../../api/AxiosBaseUrl";
import { MdWork, MdPerson, MdMessage } from "react-icons/md";

const EmployeeDashBoard = () => {
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showAppliedJobModal, setShowAppliedJobModal] = useState(false); // <-- new state
  const [newManager, setNewManager] = useState({
    Manager_name: "",
    contact_number: "",
    Manager_email: "",
    password: "",
    Number_of_employee: 0,
  });
const cards = [
  { title: "Interviews", icon: <MdBarChart className="icon-sty-card" /> },
  { title: "Apply", icon: <MdWork className="icon-sty-card" /> },
  { title: "Profile", icon: <MdPerson className="icon-sty-card" /> },
  { title: "Messages", icon: <MdMessage className="icon-sty-card" /> },
];

  const handleEmployee = async () => {
    const admin_id = localStorage.getItem("plan_admin_id");
    const user_id = localStorage.getItem("admin_user_id");
    const manager_id = localStorage.getItem("manager_id");

    if (!admin_id) {
      alert("Admin ID missing. Please login again.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URLL}api3/EmployeeRegestration/`,
        {
          name: newManager.Manager_name,
          contact_number: newManager.contact_number,
          email: newManager.Manager_email,
          password: newManager.password,
          admin: admin_id,
          user_id: user_id,
          manager: manager_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Employee Added Successfully!");
      setShowEmployeeModal(false);
      setNewManager({
        name: "",
        contact_number: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error.response?.data || error);
      alert("Failed to add employee.");
    }
  };

  return (
    <>
      <div className="main-container">
        <EmployeeLeftNav />
        <div className="main">
          <div className="awc-dashboard-title">
            <div className="jpcard-main">
              <div className="home-list-item">
                <ul type="none">
                  <RiHome2Line className="icon-sty" /> <li>Home</li>
                  <IoIosArrowForward className="icon-sty" />{" "}
                  <li>Employee DashBoard</li>
                </ul>
              </div>

              <Row className="my-4">
  {cards.map((card, i) => (
    <Col lg={3} md={3} sm={12} className="mb-4" key={i}>
      <Card style={{ width: "18rem" }} className="card-style">
        <Card.Body>
          <Card.Text>
            <div className="text-white">
              <div className="mb-2">
                {card.icon}
              </div>
              <div className="d-flex align-items-center justify-content-between brjb-amout">
                <h5 className="m-0 fw-normal">{card.title}</h5>
                <h3 className="m-0">3500</h3>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

            </div>

            <div className="dash-heading employee-dashh ">
              <div className="d-flex justify-content-between align-items-center">
                <h1>Employee DashBoard</h1>
                <div className="d-flex gap-3 emp-btn">
                  <Button
                    className="Jobs-btn"
                    variant=""
                    onClick={() => setShowAppliedJobModal(true)}
                  >
                    View Applied Jobs
                  </Button>
                  <Button
                    className="post-btn"
                    variant=""
                    onClick={() => setShowJobModal(true)}
                  >
                    Post Job
                  </Button>
                </div>
              </div>

              <PostJobGetView />
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      <Modal
        show={showEmployeeModal}
        onHide={() => setShowEmployeeModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Manager Name</Form.Label>
              <Form.Control
                type="text"
                value={newManager.Manager_name}
                onChange={(e) =>
                  setNewManager({ ...newManager, Manager_name: e.target.value })
                }
                placeholder="Enter full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                value={newManager.contact_number}
                onChange={(e) =>
                  setNewManager({
                    ...newManager,
                    contact_number: e.target.value,
                  })
                }
                placeholder="Enter contact number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newManager.Manager_email}
                onChange={(e) =>
                  setNewManager({
                    ...newManager,
                    Manager_email: e.target.value,
                  })
                }
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newManager.password}
                onChange={(e) =>
                  setNewManager({ ...newManager, password: e.target.value })
                }
                placeholder="Enter password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEmployeeModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEmployee}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Post Job Modal */}
      <Modal
        show={showJobModal}
        onHide={() => setShowJobModal(false)}
        size="lg"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Post New Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobCard />
        </Modal.Body>
      </Modal>

      {/* Applied Job Modal */}
      <Modal
        show={showAppliedJobModal}
        onHide={() => setShowAppliedJobModal(false)}
        size="lg"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>User Applied Jobs List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserAppliedJob />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmployeeDashBoard;
