import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaFileAlt } from "react-icons/fa";
import { HiOutlinePresentationChartLine, HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaAlignLeft } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { FaFileCircleCheck } from "react-icons/fa6";
import "../../../assets/css/RHSNav.css"
import "../../../custom/Mainstyle.css";


function RHSNav({ isNavClosedProp, toggleNavProp }) {
  const navigate = useNavigate();

  const navigationOptions = [
    { icon: <RxDashboard />, label: "Dashboard", path: "/EmployeeDashBoard" },
    { icon: <FaFileAlt />, label: "Application", path: "/EmployeeDashBoard" },
    { icon: <HiOutlinePresentationChartLine />, label: "Statistics", path: "/Statistics" },
    { icon: <FaFileCircleCheck />, label: "Job Approvals", path: "/JobApprovals" },
    { icon: <HiOutlineDocumentReport />, label: "Users Report", path: "/UsersReport" },
    { icon: <MdOutlineAssignmentInd />, label: "Assign Access", path: "/AssignAccess" },
    { icon: <IoMdSettings />, label: "Settings", path: "/Settings" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/UserLogin");
  };

  return (
    <div className={`cdpo-lhs-nav ${isNavClosedProp ? "nav-closed" : ""}`}>
      <div className="navcontainer">
        <nav className="nav">
          <div className="nav-upper-options">
            <div className="awc-menu d-flex justify-content-between align-items-center">
              {/* Toggle icon */}
              <FaAlignLeft className="icn menuicn" onClick={toggleNavProp} style={{ cursor: "pointer" }} />
              <span className="awc-user">Employee : Profile</span>
              <LuLogOut className="awc-log-icon" onClick={handleLogout} title="Logout" />
            </div>

            {navigationOptions.map((option, idx) => (
              <Link key={idx} to={option.path} className="nav-option">
                <div className="nav-item d-flex align-items-center">
                  <span className="nav-icon me-2">{option.icon}</span>
                  <span className="nav-label">{option.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default RHSNav;
