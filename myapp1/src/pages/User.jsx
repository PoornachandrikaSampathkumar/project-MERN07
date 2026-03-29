import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function User() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  /* ✅ SAFE AUTH CHECK */
  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!user || role !== "user") {
      navigate("/");
    }
  }, [navigate]);

  /* ✅ LOAD EVENTS */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={container}>
      <h2 style={heading}>Events 💜</h2>

      {/* LOGOUT */}
      <button
        style={logoutBtn}
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout ❌
      </button>

      {/* EVENTS */}
      <div style={eventsGrid}>
        {events.map((e) => (
          <div key={e._id} style={eventCard}>
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p><b>Date:</b> {e.date}</p>
            <p><b>Venue:</b> {e.venue}</p>

            {/* ✅ OPEN COMMENTS PAGE */}
            <button
              style={bookBtn}
              onClick={() => navigate(`/event/${e._id}`)}
            >
              Discussion 💬
            </button>

            {/* ✅ DIRECT BOOK BUTTON */}
            <button
              style={{ ...bookBtn, marginTop: 8, background: "#7b5cff" }}
              onClick={() => navigate(`/booking/${e._id}`)}
            >
              Book Now 💜
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  minHeight: "100vh",
  padding: 20,
  background: "#f3efff",
};

const heading = {
  textAlign: "center",
  marginBottom: 20,
};

const logoutBtn = {
  position: "fixed",
  bottom: 20,
  right: 20,
  background: "red",
  color: "#fff",
  padding: "10px 15px",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
};

const eventsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 20,
};

const eventCard = {
  background: "#b7a8c2",
  color: "black",
  padding: 15,
  borderRadius: 10,
  boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
};

const bookBtn = {
  background: "purple",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  cursor: "pointer",
};