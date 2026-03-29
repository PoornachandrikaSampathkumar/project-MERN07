import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");

  const navigate = useNavigate();

  /* LOAD EVENTS */
  const loadEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  /* ADD EVENT */
  const addEvent = async () => {
    if (!title || !description || !date || !venue) {
      return alert("Enter all fields");
    }

    try {
      await axios.post("http://localhost:5000/api/events", {
        title,
        description,
        date,
        venue,
      });

      setTitle("");
      setDescription("");
      setDate("");
      setVenue("");

      loadEvents();
    } catch (err) {
      console.log(err);
    }
  };

  /* UPDATE EVENT */
  const updateEvent = async (id) => {
    const newTitle = prompt("New title");
    const newDescription = prompt("New description");
    const newDate = prompt("New date");
    const newVenue = prompt("New venue");

    if (!newTitle || !newDescription || !newDate || !newVenue) return;

    try {
      await axios.put(`http://localhost:5000/api/events/${id}/update`, {
        title: newTitle,
        description: newDescription,
        date: newDate,
        venue: newVenue,
      });

      loadEvents();
    } catch (err) {
      console.log(err);
    }
  };

  /* DELETE EVENT */
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      loadEvents();
    } catch (err) {
      console.log(err);
    }
  };

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

      {/* ADD EVENT FORM */}
      <div style={formBox}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textarea}
        />

        <input
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={input}
        />

        <input
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          style={input}
        />

        <button style={addBtn} onClick={addEvent}>
          Add Event
        </button>
      </div>

      {/* EVENT CARDS */}
      <div style={eventsGrid}>
        {events.map((e) => (
          <div
            key={e._id}
            style={eventCard}
            onClick={() => navigate(`/event/${e._id}`)}
          >
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p><b>Date:</b> {e.date}</p>
            <p><b>Venue:</b> {e.venue}</p>

            <div style={btnRow}>
              <button
                style={updateBtn}
                onClick={(ev) => {
                  ev.stopPropagation();
                  updateEvent(e._id);
                }}
              >
                Update
              </button>

              <button
                style={deleteBtn}
                onClick={(ev) => {
                  ev.stopPropagation();
                  deleteEvent(e._id);
                }}
              >
                Delete
              </button>

              {/* ✅ VIEW BOOKINGS BUTTON */}
              <button
                style={viewBookingBtn}
                onClick={(ev) => {
                  ev.stopPropagation();
                  navigate(`/admin/bookings/${e._id}`);
                }}
              >
                Bookings
              </button>
            </div>
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

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginBottom: 20,
  alignItems: "center",
};

const input = {
  width: 300,
  padding: 10,
  borderRadius: 5,
  border: "1px solid #ccc",
};

const textarea = {
  width: 300,
  padding: 10,
  borderRadius: 5,
  border: "1px solid #ccc",
  height: 60,
};

const addBtn = {
  background: "green",
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
  background: "#d2d1d8",
  color: "black",
  padding: 15,
  borderRadius: 10,
  boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
  cursor: "pointer",
};

const btnRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 10,
};

const updateBtn = {
  background: "green",
  color: "#000",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  cursor: "pointer",
};

const deleteBtn = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  cursor: "pointer",
};

const viewBookingBtn = {
  background: "purple",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  cursor: "pointer",
};