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
import { FaPhp } from "react-icons/fa6";
function RHSNav({ isNavClosedProp, toggleNavProp }) {
  const navigate = useNavigate();

  return (
 
    <>
    <div className="mt-5" >
        <div>
           <div>
    <Link to="/UserTrainingDashBoard">  <button className="training-btn"><span className="span-tg-icon"><MdDashboard /></span>DashBoard</button></Link>
      </div>
    <Link to="/Python">  <button className="training-btn"><span className="span-tg-icon"><FaPython /></span>Python</button></Link>
      </div>
        <div>
    <Link to="/PHP">  <button className="training-btn"><span className="span-tg-icon"><FaPhp /></span>PHP</button></Link>
      </div>
     <Link to="/ReactTraining"> <button className="training-btn"><span className="span-tg-icon"><RiReactjsFill /></span>React Training</button></Link>
      </div>
       <div>
    <Link to="/Bootstrap">  <button className="training-btn"><span className="span-tg-icon"><BsBootstrap/></span>HTML/CSS/Bootstrap</button></Link>
      </div>

      <div>
    <Link to="/WebDesign">  <button className="training-btn"><span className="span-tg-icon"><LiaLaptopCodeSolid/></span>Web Desgin</button></Link>
      </div>
       <div>
    <Link to="/UXTraining">  <button className="training-btn"><span className="span-tg-icon"><CgWebsite/></span>UI/UX Tranning</button></Link>
      </div>
       <div>
    <Link to="/MYSql">  <button className="training-btn"><span className="span-tg-icon"><PiFileSqlFill/></span>My SQL</button></Link>
      </div>
      <div>
    <Link to="/CommunicationTraining">  <button className="training-btn"><span className="span-tg-icon"><PiUsersFourFill/></span>Communicationr</button></Link>
      </div>
      <div>
    <Link to="/InterView">  <button className="training-btn"><span className="span-tg-icon"><TbUsersGroup/></span>Interview</button></Link>
      </div>
      <div>
    <Link to="/Confidance">  <button className="training-btn"><span className="span-tg-icon"><MdSelfImprovement/></span>UI/UX Desiner</button></Link>
      </div>
      <div>
    <Link to="/VideoTraining">  <button className="training-btn"><span className="span-tg-icon"><RiFileVideoLine/></span>Video Training</button></Link>
      </div>
      <div>
    <Link to="/LiveTraining">  <button className="training-btn"><span className="span-tg-icon"><RiNewsLine/></span>Live Training</button></Link>
      </div>
      <div>
    <Link to="/PDFTraining">  <button className="training-btn"><span className="span-tg-icon"><ImFilePdf/></span>PDF</button></Link>
      </div>
      <div>
    <Link to="/UpcomingEvent">  <button className="training-btn"><span className="span-tg-icon"><MdEmojiEvents/></span>Upcoming Event</button></Link>
      </div>
     
      </>
  );
}

export default RHSNav;
