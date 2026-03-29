import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import AdminBookings from "./pages/AdminBookings";
import EventDetails from "./pages/EventDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/user" element={<User />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/event/:id" element={<EventDetails />} />

        <Route path="/booking/:id" element={<Booking />} />

        <Route path="/admin/bookings/:id" element={<AdminBookings />} />

      </Routes>
    </BrowserRouter>
  );
}