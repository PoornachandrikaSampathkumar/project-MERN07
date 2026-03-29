import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import User from "./pages/User.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import AdminBookings from "./pages/AdminBookings.jsx";

export default function AppRoutes() {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        {/* Login or redirect */}
        <Route path="/" element={user ? <Navigate to={role === "admin" ? "/admin" : "/user"} /> : <Login />} />

        {/* Admin dashboard */}
        <Route path="/admin" element={role === "admin" ? <Admin /> : <Navigate to="/" />} />

        {/* User dashboard */}
        <Route path="/user" element={role === "user" ? <User /> : <Navigate to="/" />} />

        {/* Event details */}
        <Route path="/event/:id" element={user ? <EventDetails /> : <Navigate to="/" />} />

        {/* Admin view booking page */}
        <Route path="/admin/bookings/:eventId" element={role === "admin" ? <AdminBookings /> : <Navigate to="/" />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}