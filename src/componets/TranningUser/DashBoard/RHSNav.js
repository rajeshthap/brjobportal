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
import { FaPython } from "react-icons/fa";
import { MdOutlinePhp } from "react-icons/md";
import { RiReactjsFill } from "react-icons/ri";
import { BsBootstrap } from "react-icons/bs";
import { PiFileSqlFill } from "react-icons/pi";
import { PiUsersFourFill } from "react-icons/pi";
import { TbUsersGroup } from "react-icons/tb";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { CgWebsite } from "react-icons/cg";
import { MdSelfImprovement } from "react-icons/md";
import { RiFileVideoLine } from "react-icons/ri";
import { RiNewsLine } from "react-icons/ri";
import { ImFilePdf } from "react-icons/im";
import { MdEmojiEvents } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

function RHSNav({ isNavClosedProp, toggleNavProp }) {
  const navigate = useNavigate();

  const navigationOptions = [
    // { icon: <RxDashboard />, label: "Dashboard", path: "/EmployeeDashBoard" },
    { icon: <MdDashboard />, label: "DashBoard", path: "/UserTrainingDashBoard" },
    { icon: <FaPython />, label: "Python", path: "/Python" },
    { icon: <MdOutlinePhp />, label: "PHP", path: "/PHP" },
    { icon: <RiReactjsFill />, label: "React", path: "/ReactTraining" },
    { icon: <BsBootstrap />, label: "HTML/CSS/Bootsrap", path: "/Bootstrap" },
    { icon: <LiaLaptopCodeSolid />, label: "Web Desgin", path: "/WebDesign" },
    { icon: <CgWebsite />, label: "UI/UX Tranning", path: "/UXTraining" },
    { icon: <PiFileSqlFill />, label: "My SQL", path: "/MYSql" },
    { icon: <PiUsersFourFill />, label: "Communication", path: "/CommunicationTraining" },
    { icon: <TbUsersGroup />, label: "InterviewSkills", path: "/InterView" },
    { icon: <MdSelfImprovement />, label: "Self Confidance", path: "/Confidance" },
   { icon: <RiFileVideoLine />, label: "Video Tutorial", path: "/VideoTraining" },
   { icon: <RiNewsLine />, label: "Live Tutorial", path: "/LiveTraining" },
   { icon: <ImFilePdf />, label: "PDF Tutorial", path: "/PDFTraining" },
   { icon: <MdEmojiEvents />, label: "Upcomming Event", path: "/UpcomingEvent" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/UserLogin");
  };

  return (
    <div className={`cdpo-lhs-nav ${isNavClosedProp ? "nav-closed" : ""}`}>
      <div className="navcontainert">
        <nav className="navt">
          <div className="nav-upper-options-t">
            <div className="awc-menu d-flex justify-content-between align-items-center">
              {/* Toggle icon */}
              <FaAlignLeft className="icn menuicn" onClick={toggleNavProp} style={{ cursor: "pointer" }} />
              <span className="awc-user">Employee : Profile</span>
              <LuLogOut className="awc-log-icon" onClick={handleLogout} title="Logout" />
            </div>

            {navigationOptions.map((option, idx) => (
              <Link key={idx} to={option.path} className="nav-option">
                <div className="nav-item d-flex align-items-center">
                  <span className="nav-icon-t me-2">{option.icon}</span>
                  <span className="nav-label-t">{option.label}</span>
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
