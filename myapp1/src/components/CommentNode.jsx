import { useState } from "react";
import axios from "axios";

export default function CommentNode({ c, all, refresh, eventId }) {
  const [reply, setReply] = useState("");

  const like = () => {
    axios.put(`http://localhost:5000/api/comments/like/${c._id}`, {
      userId: "user1"
    }).then(refresh);
  };

  const sendReply = () => {
    axios.post(`http://localhost:5000/api/comments/${eventId}`, {
      user: "user1",
      text: reply,
      parentId: c._id
    }).then(() => { setReply(""); refresh(); });
  };

  return (
    <div style={{ marginLeft: c.parentId ? 20 : 0 }}>
      <p>{c.text}</p>

      <button onClick={like}>👍 {c.likes.length}</button>

      <input value={reply} onChange={e => setReply(e.target.value)} />
      <button onClick={sendReply}>Reply</button>

      {all.filter(x => x.parentId === c._id)
        .map(child => (
          <CommentNode key={child._id} c={child} all={all} refresh={refresh} eventId={eventId} />
        ))}
    </div>
  );
}