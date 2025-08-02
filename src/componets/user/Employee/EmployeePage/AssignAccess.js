import React, { useState } from "react";
import "../../../../custom/Mainstyle.css";
import "../../../../assets/css/AdminDashBoard.css";
import "../../../../assets/css/AdminInnerDashBoard.css";
import Card from "react-bootstrap/Card";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { MdBarChart } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RiHome2Line } from "react-icons/ri";
import EmployeeLeftNav from "../EmployeeLeftNav";
import Image1 from "../../../../assets/images/coming-soon1.jpg"

// <-- import your component

const AssignAccess = () => {
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
             
            </div>

            <div className="dash-heading employee-dashh ">
              <div className=" align-items-center">
               <Card>
                <div className="align-item-center cooming-ssen-img">
                  <img src={Image1} alt="Coming Soon"></img>  
                </div>
                </Card>
                <div className="d-flex gap-3 emp-btn"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}

      {/* Applied Job Modal */}
    </>
  );
};

export default AssignAccess;
