import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "../src/custom/style.css";
import NavBar from "./componets/user/top-navbar/NavBar";
import Home from "./componets/user/UserPages/Home";
import NotFound from "./componets/notfound/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-icons-kit";
import "font-awesome/css/font-awesome.min.css";
import "../src/custom/style.css";

import UserRegistration from "./componets/user/UserPages/UserRegistration";
import UserLogin from "./componets/user/UserPages/UserLogin";
import Cards from "./componets/user/UserPages/Cards";
import Footer from "./componets/user/footer/Footer";
// import UserDashBoard from "./componets/user/leftnav/UserDashBoard";
import JobCard from "./componets/user/leftnav/JobCard";
import PostJobCard from "./componets/user/leftnav/PostJobCard";
import JobDetails from "./componets/user/leftnav/JobDetails";
import SavedJobsList from "./componets/user/UserPages/SavedJobsList";
import SavedJobCard from "./componets/user/UserPages/SavedJobCard";
import Profile from "./componets/user/leftnav/Profile";
import UserProfile from "./componets/user/UserPages/UserProfile";
import Logout from "./componets/user/UserPages/Logout";
import ForgotPassword from "./componets/user/UserPages/ForgotPassword";
import ViewProfile from "./componets/user/UserPages/ViewProfile";
import DashBoardUser from "./componets/user/leftnav/DashBoardUser";
import ActivePlan from "./componets/user/Admin/ActivePlan";
import ActivePlanDetails from "./componets/user/Admin/ActivePlanDetails";
import AdminRegistration from "./componets/user/Admin/AdminRegistration";
import AdminDashboard from "./componets/user/Admin/AdminDashBoard";
import AdminLogin from "./componets/user/Admin/AdminLogin";
import AdminForgotPassword from "./componets/user/Admin/AdminForgotPassword";
import "../src/custom/Mainstyle.css";
import AdmininnerDashBoard from "./componets/user/Admin/AdmininnerDashBoard";
import AdminProfile from "./componets/user/Admin/AdminProfile";
import ManagerDashBoard from "./componets/user/Manager/ManagerDashBoard";
import ManagerLeftNav from "./componets/user/Manager/ManagerLeftNav";
import EmployeeDashBoard from "./componets/user/Employee/EmployeeDashBoard";
import EmployeeLeftNav from "./componets/user/Employee/EmployeeLeftNav";
import SettingPassword from "./componets/user/Admin/SettingPassword";
import ManagerProfile from "./componets/user/Manager/ManagerProfile";
import TrainingReact from "./componets/user/Training/TrainingReact";
import TrainingPython from "./componets/user/Training/TrainingPython";
import TrainingWebDesign from "./componets/user/Training/TrainingWebDesign";
import TrainingPHP from "./componets/user/Training/TrainingPHP";
import TrainingMySql from "./componets/user/Training/TrainingMySql";
import TrainingBootstrap from "./componets/user/Training/TrainingBootstrap";
import UIUXTraining from "./componets/user/Training/UIUXTraining";
import Communication from "./componets/user/GrowingClass/Communication";
import InterviewSkill from "./componets/user/GrowingClass/InterviewSkill";
import SelfConfidence from "./componets/user/GrowingClass/SelfConfidence";
import PublicSpeaking from "./componets/user/GrowingClass/PublicSpeaking";
import PdfTutorial from "./componets/user/StudyMaterial/PdfTutorial";
import VideoTutorial from "./componets/user/StudyMaterial/VideoTutorial";
import LiveClass from "./componets/user/StudyMaterial/LiveClass";
import Event from "./componets/user/Event/Event";
import PostJobGetView from "./componets/user/Employee/PostJobGetView";
import EmployeeProfile from "./componets/user/Employee/EmployeeProfile";
import TrainingRegistration from "./componets/user/Training/TrainingRegistration";
import SendOtp from "./componets/user/UserPages/SendOtp";
import UserOtp from "./componets/user/UserPages/UserOtp";
import Statistics from "./componets/user/Employee/EmployeePage/Statistics";
import JobApprovals from "./componets/user/Employee/EmployeePage/JobApprovals";
import UsersReport from "./componets/user/Employee/EmployeePage/UsersReport";
import AssignAccess from "./componets/user/Employee/EmployeePage/AssignAccess";
import Settings from "./componets/user/Employee/EmployeePage/Settings";
import Applications from "./componets/user/Employee/EmployeePage/Applications";
import MyAppliedJob from "./componets/user/UserPages/MyAppliedJob";
import User from "./componets/user/UserPages/User";
import UserVerifyOtp from "./componets/user/UserPages/UserVerifyOtp";
import Loading from "./api/Loading";
import JobListWithPagination from "./componets/user/leftnav/JobListWithPagination";
import AccessRefreshToken from "./componets/user/Employee/AccessRefreshToken";
import Success from "./api/Success";
import TrainingVerifyOtp from "./componets/user/Training/TeaningVerifyOtp";
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
// This component is rendered *inside* Router so useLocation() is safe here
const AppContent = () => {
  const location = useLocation();

  const hiddenPaths = new Set([
    "/AdmininnerDashBoard",
    "/AdminProfile",
    "/ManagerDashBoard",
    "/EmployeeDashboard",
    "/ManagerProfile",
    "/AdminDashboard",
    "/EmployeeProfile",
    "/EmployeeDashBoard",
    "/Settings",
    "/Applications",
    "/UsersReport",
    "/JobApproval0s",
    "/AssignAccess",
    "/Statistics"
  ]);
  const shouldHideNavbar = hiddenPaths.has(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/UserRegistration" element={<UserRegistration />} />
        {/* <Route path="/UserDashBoard" element={<UserDashBoard />} /> */}
        <Route path="/JobCard" element={<JobCard />} />
        <Route path="/PostJobCard/:job_id" element={<PostJobCard />} />
        <Route path="/SavedJobsList" element={<SavedJobsList />} />
        <Route path="/SavedJobCard" element={<SavedJobCard />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/ViewProfile" element={<ViewProfile />} />
        <Route path="/DashBoardUser" element={<DashBoardUser />} />
        <Route path="/AdminRegistration" element={<AdminRegistration />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminForgotPassword" element={<AdminForgotPassword />} />
        <Route path="/ActivePlan" element={<ActivePlan />} />
        <Route path="/Cards" element={<Cards />} />
        <Route path="/JobDetails" element={<JobDetails />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ActivePlanDetails" element={<ActivePlanDetails />} />
        <Route path="/AdmininnerDashBoard" element={<AdmininnerDashBoard />} />
        <Route path="/ManagerDashBoard" element={<ManagerDashBoard />} />
        <Route path="/ManagerLeftNav" element={<ManagerLeftNav />} />
        <Route path="/EmployeeDashBoard" element={<EmployeeDashBoard />} />
        <Route path="/EmployeeLeftNav" element={<EmployeeLeftNav />} />
        <Route path="/SettingPassword" element={<SettingPassword />} />
        <Route path="/ManagerProfile" element={<ManagerProfile />} />
        <Route path="/TrainingReact" element={<TrainingReact />} />
        <Route path="/TrainingPython" element={<TrainingPython />} />
        <Route path="/TrainingWebDesign" element={<TrainingWebDesign />} />
        <Route path="/TrainingPHP" element={<TrainingPHP />} />
        <Route path="/TrainingMySql" element={<TrainingMySql />} />
        <Route path="/TrainingBootstrap" element={<TrainingBootstrap />} />
        <Route path="/UIUXTraining" element={<UIUXTraining />} />
        <Route path="/Communication" element={<Communication />} />
        <Route path="/SelfConfidence" element={<SelfConfidence />} />
        <Route path="/InterviewSkill" element={<InterviewSkill />} />
        <Route path="/PublicSpeaking" element={<PublicSpeaking />} />
        <Route path="/PdfTutorial" element={<PdfTutorial />} />
        <Route path="/VideoTutorial" element={<VideoTutorial />} />
        <Route path="/LiveClass" element={<LiveClass />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/PostJobGetView" element={<PostJobGetView />} />
        <Route path="/EmployeeProfile" element={<EmployeeProfile />} />
        <Route path="/TrainingRegistration" element={<TrainingRegistration />} />
        <Route path="/SendOtp" element={<SendOtp />} />
        <Route path="/UserOtp" element={<UserOtp />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/AssignAccess" element={<AssignAccess />} />
        <Route path="/JobApprovals" element={<JobApprovals />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/UsersReport" element={<UsersReport />} />
        <Route path="/Applications" element={<Applications />} />
        <Route path="/MyAppliedJob" element={<MyAppliedJob />} />
        <Route path="/AdminProfile" element={<AdminProfile />} />
        <Route path="/User" element={<User />} />
        <Route path="/UserVerifyOtp" element={<UserVerifyOtp />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/JobListWithPagination" element={<JobListWithPagination />} />
        <Route path="/Success" element={<Success />} />
        <Route path="/AccessRefreshToken" element={<AccessRefreshToken />} />
        <Route path="/TrainingVerifyOtp" element={<TrainingVerifyOtp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
