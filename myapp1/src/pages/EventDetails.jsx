import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const user = role === "admin" ? "Admin" : localStorage.getItem("user") || "User";

  const [event, setEvent] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  /* ================= LOAD EVENT ================= */
  const loadEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= LOAD COMMENTS ================= */
  const loadComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEvent();
    loadComments();
  }, [id]);

  /* ================= ADD COMMENT ================= */
  const addComment = async () => {
    if (!text.trim()) return;

    await axios.post(`http://localhost:5000/api/comments/${id}`, {
      text,
      user,
    });

    setText("");
    loadComments();
  };

  /* ================= REPLY ================= */
  const reply = async (parentId) => {
    const replyText = prompt("Enter reply");
    if (!replyText) return;

    await axios.post(`http://localhost:5000/api/comments/${id}`, {
      text: replyText,
      user,
      parentId,
    });

    loadComments();
  };

  /* ================= LIKE ================= */
  const like = async (cid) => {
    await axios.put(`http://localhost:5000/api/comments/like/${cid}`, {
      userId: user,
    });
    loadComments();
  };

  /* ================= EDIT ================= */
  const edit = async (cid, oldText) => {
    const newText = prompt("Edit comment", oldText);
    if (!newText) return;

    await axios.put(`http://localhost:5000/api/comments/${cid}`, {
      text: newText,
    });

    loadComments();
  };

  /* ================= DELETE ================= */
  const del = async (cid) => {
    if (!window.confirm("Delete comment?")) return;

    await axios.delete(`http://localhost:5000/api/comments/${cid}`);
    loadComments();
  };

  /* ================= TAG HIGHLIGHT ================= */
  const highlightTags = (txt) => {
    const parts = txt.split(/(@\w+)/g);
    return parts.map((part, i) =>
      part.startsWith("@") ? (
        <span key={i} style={{ color: "#7b5cff", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  /* ================= TREE COMMENTS ================= */
  const renderComments = (parentId = null, margin = 0) => {
    return comments
      .filter((c) => c.parentId === parentId)
      .map((c) => (
        <div key={c._id} style={{ ...commentBox, marginLeft: margin }}>
          <p>
            <b style={{ color: c.user === "Admin" ? "#ffd700" : "#000" }}>
              {c.user}
            </b>
          </p>

          <p>{highlightTags(c.text)}</p>

          <div style={btnRow}>
            <button style={likeBtn} onClick={() => like(c._id)}>
              👍 {c.likes?.length || 0}
            </button>
            <button style={replyBtn} onClick={() => reply(c._id)}>
              Reply
            </button>
            <button style={editBtn} onClick={() => edit(c._id, c.text)}>
              Edit
            </button>
            <button style={deleteBtn} onClick={() => del(c._id)}>
              Delete
            </button>
          </div>

          {renderComments(c._id, margin + 30)}
        </div>
      ));
  };

  /* ================= BOOK EVENT ================= */
  const goToBooking = () => {
    navigate(`/booking/${id}`); // ✅ CORRECT ROUTE
  };

  return (
    <div style={container}>
      {/* EVENT DETAILS */}
      <h2 style={heading}>{event.title}</h2>
      <p style={eventDesc}>{event.description}</p>

      {/* BOOK BUTTON (ONLY USER) */}
      {role !== "admin" && (
        <button style={bookBtn} onClick={goToBooking}>
          Book Event 💜
        </button>
      )}

      {/* COMMENTS */}
      <h2 style={{ ...heading, marginTop: 40 }}>Discussion</h2>

      <div style={inputBox}>
        <input
          placeholder="Write a comment... (@username)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={input}
        />
        <button style={addBtn} onClick={addComment}>
          Comment
        </button>
      </div>

      {renderComments()}
    </div>
  );
}

/* ================= STYLES ================= */
const container = {
  minHeight: "100vh",
  padding: 20,
  background: "#f3efff",
};

const heading = {
  textAlign: "center",
  marginBottom: 20,
};

const eventDesc = {
  textAlign: "center",
  marginBottom: 20,
};

const bookBtn = {
  background: "#7b5cff",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: 5,
  cursor: "pointer",
  display: "block",
  margin: "0 auto 30px",
};

const inputBox = {
  display: "flex",
  justifyContent: "center",
  gap: 10,
  marginBottom: 20,
};

const input = {
  padding: 10,
  width: 320,
  borderRadius: 5,
  border: "1px solid #ccc",
};

const addBtn = {
  background: "green",
  color: "#fff",
  padding: "10px 15px",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
};

const commentBox = {
  background: "#fff",
  padding: 15,
  borderRadius: 10,
  marginBottom: 10,
  boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
};

const btnRow = {
  display: "flex",
  gap: 10,
  marginTop: 10,
};

const likeBtn = {
  background: "#ddd",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  cursor: "pointer",
};

const replyBtn = {
  background: "#e45cff",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  cursor: "pointer",
};

const editBtn = {
  background: "green",
  color: "#fff",
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