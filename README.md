📖 Description
The Event Discussion Platform is a full-stack web application where users can explore events, book them, and participate in discussions. It provides an interactive environment for communication related to events, along with admin control for event management.

🚀 Features
Admin can create, update, and delete events
Users can view events with details
Event booking with name, email, and phone number
Discussion system with comments and replies
Nested (tree-structured) comments
Like, edit, and delete comments
Basic notification system (reply & tagging)
User and Admin roles
Simple and user-friendly interface

🛠️ Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB (Atlas)
HTTP Client: Axios

📂 Project Structure

event-platform/
│
├── client/ (Frontend - React)
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/ (Backend - Node/Express)
│   ├── server.cjs
│   └── models (inline in server)
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository

git clone <your-repo-link>
cd event-platform
2️⃣ Backend Setup

cd server
npm install
node server.cjs
Server runs on:

http://localhost:5000
3️⃣ Frontend Setup

cd client
npm install
npm run dev
Frontend runs on:

http://localhost:5173

🔑 Usage
👩‍💼 Admin
Login as admin
Add / Update / Delete events
View bookings

👤 User
View events
Book events
Participate in discussions

🌐 Deployment
Frontend deployed using Netlify
Backend connected with MongoDB Atlas

⚠️ Limitations
No payment integration
Basic authentication
Notifications are not real-time

📌 Future Enhancements
Real-time notifications
Payment gateway integration
Improved security (JWT authentication)
Better UI/UX design

👩‍💻 Author
Poornachandrika.S

🎯 Conclusion
This project demonstrates a complete MERN stack application with event management, booking, and discussion features, providing a simple and interactive platform for users.
