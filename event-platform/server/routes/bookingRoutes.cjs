import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Booking() {
  const { id } = useParams(); // eventId
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [name, setName] = useState("");   // user types name
  const [email, setEmail] = useState(""); // user types email
  const [phone, setPhone] = useState(""); // user types phone

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEventName(res.data.title);
      } catch (err) {
        console.log(err);
        alert("Event not found");
        navigate("/user");
      }
    };
    loadEvent();
  }, [id]);

  const submitBooking = async () => {
    if (!name || !email || !phone) return alert("Enter all fields");

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        eventId: id,
        name,
        email,
        phone,
      });
      alert("Booked successfully 💜");
      navigate("/user");
    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  return (
    <div style={container}>
      <h2 style={heading}>Book Event 💜</h2>
      <input placeholder="Event Name" value={eventName} style={input} readOnly />
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={input} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
      <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />
      <button style={btn} onClick={submitBooking}>Submit Booking</button>
    </div>
  );
}

/* STYLES */
const container = { minHeight: "100vh", padding: 20, background: "#f3efff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 };
const heading = { textAlign: "center", marginBottom: 20 };
const input = { width: 300, padding: 10, borderRadius: 5, border: "1px solid #ccc" };
const btn = { background: "purple", color: "#fff", border: "none", padding: "10px 15px", borderRadius: 5, cursor: "pointer" };