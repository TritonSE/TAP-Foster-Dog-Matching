import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Application from "./pages/Application";
import Calendar from "./pages/Calendar";
import ContactUs from "./pages/ContactUs";
import Fosters from "./pages/Fosters";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PendingApplications from "./pages/PendingApplications";
import DogProfile from "./pages/DogProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/application" element={<Application />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/fosters" element={<Fosters />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Admin Routes TODO: set up conditional routing based on user role */}
        <Route path="/pending-applications" element={<PendingApplications />} />
        <Route path="/manage-dog-profiles" element={<DogProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
