import { useEffect, useState } from "react";
import axios from "axios";

function NotificationBell(){
  const [n,setN]=useState([]);

  useEffect(()=>{
    axios.get("/api/notifications/user1")
    .then(res=>setN(res.data));
  },[]);

  return <div>🔔 {n.length}</div>;
}

export default NotificationBell;