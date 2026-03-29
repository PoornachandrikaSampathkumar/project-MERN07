import { useState } from "react";
import axios from "axios";

function CommentTree({ comments, parentId=null, refresh }) {
  return (
    <div style={{marginLeft: parentId ? 20 : 0}}>
      {comments.filter(c=>c.parentId===parentId).map(c=>(
        <Node key={c._id} c={c} comments={comments} refresh={refresh}/>
      ))}
    </div>
  );
}

function Node({ c, comments, refresh }) {
  const [edit,setEdit]=useState(false);
  const [text,setText]=useState(c.text);
  const [reply,setReply]=useState("");

  const like=()=>axios.put(`/api/comments/like/${c._id}`,{userId:"user1"}).then(refresh);

  const del=()=>axios.delete(`/api/comments/${c._id}`).then(refresh);

  const save=()=>axios.put(`/api/comments/${c._id}`,{text}).then(()=>{
    setEdit(false); refresh();
  });

  const addReply=()=>axios.post(`/api/comments/${c.eventId}`,{
    user:"user1", text:reply, parentId:c._id
  }).then(()=>{setReply(""); refresh();});

  return (
    <div className="card">
      {edit ? <input value={text} onChange={e=>setText(e.target.value)}/> :
        <p><b>{c.user}</b>: {c.text}</p>}

      <button onClick={like}>👍 {c.likes.length}</button>
      <button onClick={()=>setEdit(true)}>Edit</button>
      <button onClick={del}>Delete</button>

      {edit && <button onClick={save}>Save</button>}

      <input value={reply} onChange={e=>setReply(e.target.value)} placeholder="Reply"/>
      <button onClick={addReply}>Reply</button>

      <CommentTree comments={comments} parentId={c._id} refresh={refresh}/>
    </div>
  );
}

export default CommentTree;