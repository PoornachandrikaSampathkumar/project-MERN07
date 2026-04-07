// server.cjs
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DB ================= */
mongoose.connect(
  "mongodb://admin:jkevent07@ac-tyv05j8-shard-00-00.ta8ms1g.mongodb.net:27017,ac-tyv05j8-shard-00-01.ta8ms1g.mongodb.net:27017,ac-tyv05j8-shard-00-02.ta8ms1g.mongodb.net:27017/eventDB?ssl=true&replicaSet=atlas-1383qb-shard-0&authSource=admin&retryWrites=true&w=majority"
)
.then(() => console.log("✅ MongoDB Atlas Connected"))
.catch(err => console.log("❌ DB Error:", err));

/* ================= MODELS ================= */
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  username: String
});

const Event = mongoose.model("Event", {
  title: String,
  description: String,
  date: String,
  venue: String
});

const Comment = mongoose.model("Comment", {
  eventId: String,
  user: String,
  text: String,
  parentId: { type: String, default: null },
  likes: { type: [String], default: [] }
});

const Notification = mongoose.model("Notification", {
  userId: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", {
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

/* ================= HELPERS ================= */
const extractTags = (text) => {
  const regex = /@(\w+)/g;
  return [...text.matchAll(regex)].map(m => m[1]);
};

/* ================= AUTH ================= */
app.post("/api/auth/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json("Register error");
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });
    if (!user) return res.json(null);
    res.json(user);
  } catch (err) {
    res.status(500).json("Login error");
  }
});

/* ================= EVENTS ================= */
app.post("/api/events", async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
});

app.get("/api/events", async (req, res) => {
  res.json(await Event.find());
});

app.get("/api/events/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});

app.put("/api/events/:id/update", async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/api/events/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

/* ================= COMMENTS ================= */
app.post("/api/comments/:eventId", async (req, res) => {
  const { text, user, parentId } = req.body;

  const comment = await Comment.create({
    eventId: req.params.eventId,
    text,
    user,
    parentId: parentId || null
  });

  res.json(comment);
});

app.get("/api/comments/:eventId", async (req, res) => {
  res.json(await Comment.find({ eventId: req.params.eventId }));
});

/* ================= BOOKINGS ================= */
app.post("/api/bookings", async (req, res) => {
  const { eventId, name, email, phone } = req.body;

  const booking = await Booking.create({
    event: eventId,
    name: name || "N/A",
    email: email || "N/A",
    phone
  });

  res.json(booking);
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
