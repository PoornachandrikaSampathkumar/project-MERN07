import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AdminBookings() {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [id]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/event/${id}`
      );
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/${bookingId}`
      );
      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={container}>
    <h2 style={{ textAlign: "center" }}>Event Bookings 💜</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} style={card}>
            <p><b>Name:</b> {b.name || "N/A"}</p>      {/* ✅ FIXED */}
            <p><b>Email:</b> {b.email || "N/A"}</p>    {/* ✅ FIXED */}
            <p><b>Phone:</b> {b.phone}</p>

            <button onClick={() => deleteBooking(b._id)} style={btn}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

/* STYLES */
const container = {
  padding: 20,
  background: "#f3efff",
  minHeight: "100vh"
};

const card = {
  background: "#fff",
  padding: 15,
  margin: "10px 0",
  borderRadius: 10,
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
};

const btn = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  cursor: "pointer"
};