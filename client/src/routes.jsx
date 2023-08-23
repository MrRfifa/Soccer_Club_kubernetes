import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/MainPage/Home";
import SigninPage from "./pages/MainPage/SigninPage";
import SignupPage from "./pages/MainPage/SignupPage";
import {AuthContext} from "./context/AuthContext";
import Kids from "./pages/Parent/Kids";
import AddKids from "./pages/Parent/AddKids";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PendingSessions from "./pages/Coach/PendingSessions";
import PageNotFound from "./pages/CommonPages/NotFound";
import ConfirmedSessions from "./pages/Coach/ConfirmedSessions";
import DoneSessions from "./pages/Coach/DoneSessions";
import UserSidebar from "./components/UserSidebar/UserSidebar";
import {
  ParentSidebarData,
  CoachSidebarData,
  MemberSidebarData,
} from "./components/UserSidebar/UserSidebarData";
import All from "./pages/Member/All";
import Confirmed from "./pages/Member/Confirmed";
import Profile from "./components/Profile/Profile";
import Parent from "./pages/Parent/Parent";
import Coach from "./pages/Coach/Coach";
import Member from "./pages/Member/Member";
import ContactUs from "./pages/CommonPages/ContactUs";

function Router() {
  const { type, username } = useContext(AuthContext);
  return (
    <>
      {type === "Parent" && (
        <UserSidebar username={username} UserSidebarData={ParentSidebarData} />
      )}
      {type === "Coach" && (
        <UserSidebar username={username} UserSidebarData={CoachSidebarData} />
      )}
      {type === "Member" && (
        <UserSidebar username={username} UserSidebarData={MemberSidebarData} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {type === "nothing" && (
          <>
            <Route path="/" exact element={<Home />} />
            <Route path="/sign-in" element={<SigninPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </>
        )}
        {type === "Parent" && (
          <>
            <Route path="/parent" element={<Parent />} />
            <Route path="/kid" element={<Kids />} />
            <Route path="/addkid" element={<AddKids />} />
            <Route path="/update/:id" element={<AddKids />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/*" element={<PageNotFound />} />
          </>
        )}
        {type === "Coach" && (
          <>
            <Route path="/coach" element={<Coach />} />
            <Route path="/pending" element={<PendingSessions />} />
            <Route path="/confirmed" element={<ConfirmedSessions />} />
            <Route path="/done" element={<DoneSessions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/*" element={<PageNotFound />} />
          </>
        )}
        {type === "Member" && (
          <>
            <Route path="/member" element={<Member />} />
            <Route path="/all" element={<All />} />
            <Route path="/confirmed" element={<Confirmed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/*" element={<PageNotFound />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default Router;
