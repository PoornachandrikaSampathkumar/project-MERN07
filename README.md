Event Management Platform
This is a full-stack Event Management System built with MERN (MongoDB, Express, React, Node.js).
It allows users to browse events, book tickets, and comment, while admins can manage events, bookings, and notifications.
📁 Project Structure
Frontend (REACTAPP1)

REACTAPP1/
├─ src/
│  ├─ assets/                 # Images, icons, and other static assets
│  ├─ components/             # React components
│  │  ├─ CommentNode.jsx
│  │  ├─ CommentTree.cjs
│  │  └─ NotificationBell.cjs
│  ├─ context/                # React context for state management
│  ├─ pages/                  # React pages
│  │  ├─ Admin.jsx
│  │  ├─ AdminBookings.jsx
│  │  ├─ Booking.jsx
│  │  ├─ EventDetails.jsx
│  │  ├─ Login.jsx
│  │  └─ User.jsx
│  ├─ styles/                 # CSS files
│  │  ├─ App.css
│  │  └─ index.css
│  ├─ App.jsx                 # Main App component
│  ├─ AppRoutes.jsx           # React Router routes
│  └─ main.jsx                # ReactDOM render entry
├─ index.html                 # HTML entry file
├─ .gitignore
├─ package-lock.json
└─ eslint.config.js
Backend (event-platform)

event-platform/
├─ middleware/
│  └─ authMiddleware.cjs      # Authentication middleware
├─ models/                    # MongoDB schemas
│  ├─ Bookings.cjs
│  ├─ Comments.cjs
│  ├─ Event.cjs
│  ├─ Notification.cjs
│  └─ User.cjs
├─ routes/                    # Express routes
│  ├─ auth.js
│  ├─ bookingRoutes.cjs
│  ├─ comments.js
│  ├─ events.cjs
│  └─ notifications.cjs
├─ node_modules/
├─ package.json
├─ package-lock.json
└─ server.cjs   
# Express server entry

⚡ Features
User login and registration
Admin panel for managing events and bookings
Booking system with event details
Commenting system for users
Notification system for updates
Responsive design

🚀 Setup & Installation

Backend
Navigate to backend:
Bash
cd event-platform
Install dependencies:
Bash
npm install
Create .env file and add:

MONGO_URI=<your_mongo_db_connection_string>
PORT=5000
JWT_SECRET=<your_jwt_secret>
Start the server:
Bash
node server.cjs
Server runs on http://localhost:5000.

Frontend

Navigate to frontend:
Bash
cd REACTAPP1
Install dependencies:
Bash
npm install
Start React development server:
Bash
npm start
App runs on http://localhost:5173 (or default Vite port).

🔗 Deployment
Frontend can be deployed using Netlify / Vercel
Backend can be deployed using Render / Railway / Heroku
Update the API base URL in frontend when deploying.
