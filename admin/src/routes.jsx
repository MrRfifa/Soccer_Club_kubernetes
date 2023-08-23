import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MasterPage from "./pages/admin/MasterPage";
import Dashboard from "./components/admin/Dashboard";
// import Profile from "./components/admin/Profile";
//import Home from "./components/frontend/Home";
import Login from "./components/frontend/Auth/Login";
import Register from "./components/frontend/Auth/Register";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import EditTraining from "./components/admin/Training/EditTraining";
import Training from "./components/admin/Training/Training";
import Users from "./components/admin/Users/Users";
import Kids from "./components/admin/Kids/Kids";
import Editkid from "./components/admin/Kids/Editkid";
import ContactUs from "./components/admin/ContactUsMessages/ContactUs";

const AdminRoutes = () => {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  getLoggedIn();
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {loggedIn && (
            <Route path="/admin" element={<MasterPage />}>
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/kids" element={<Kids />} />
              <Route path="/admin/training" element={<Training />} />
              <Route path="/admin/messages" element={<ContactUs />} />
              <Route
                path="/admin/training/edit-session/:id"
                element={<EditTraining />}
              />
              <Route path="/admin/kids/edit-kid/:id" element={<Editkid />} />
            </Route>
          )}
          {!loggedIn && (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default AdminRoutes;
