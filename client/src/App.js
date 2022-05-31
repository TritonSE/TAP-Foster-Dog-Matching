import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
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
import NotFound from "./pages/NotFound";

function AppRouter() {
  const { signedIn, currentUser } = React.useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Unprotected Routes */}
        {!signedIn && (
          <>
            <Route path="*" element={<Navigate replace to="/" />} />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {/* Foster Routes */}
        {signedIn && currentUser.type === "user" && (
          <>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<ContactUs />} />
          </>
        )}

        {/* Management Routes */}
        {signedIn && currentUser.type === "admin" && currentUser.role === "management" && (
          <>
            <Route path="/" element={<Navigate replace to="/pending-applications" />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/fosters" element={<Fosters />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pending-applications" element={<PendingApplications />} />
            <Route path="/manage-dog-profiles" element={<DogProfile />} />
          </>
        )}

        {/* Ambassador Routes */}
        {signedIn && currentUser.type === "admin" && currentUser.role === "ambassador" && (
          <>
            <Route path="/" element={<Navigate replace to="/pending-applications" />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/fosters" element={<Fosters />} />
            <Route path="/pending-applications" element={<PendingApplications />} />
            <Route path="/manage-dog-profiles" element={<DogProfile />} />
          </>
        )}

        {/* Coordinator Routes */}
        {signedIn && currentUser.type === "admin" && currentUser.role === "coordinator" && (
          <>
            <Route path="/" element={<Navigate replace to="/fosters" />} />
            <Route path="/fosters" element={<Fosters />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manage-dog-profiles" element={<DogProfile />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />

        {/* TODO: remove this route after Application has been integrated within the respective pages */}
        <Route path="/application" element={<Application />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
