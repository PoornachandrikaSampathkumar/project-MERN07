// server.cjs
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


/* ================= DB ================= */
mongoose.connect(
"mongodb://admin:jkevent07@ac-tyv05j8-shard-00-00.ta8ms1g.mongodb.net:27017,ac-tyv05j8-shard-00-01.ta8ms1g.mongodb.net:27017,ac-tyv05j8-shard-00-02.ta8ms1g.mongodb.net:27017/eventDB?ssl=true&replicaSet=atlas-1383qb-shard-0&authSource=admin&retryWrites=true&w=majority"
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
    console.log(err);
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
    console.log(err);
    res.status(500).json("Login error");
  }
});

/* ================= EVENTS ================= */
app.post("/api/events", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

app.get("/api/events", async (req, res) => {
  try {
    res.json(await Event.find());
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json("Event not found");
    res.json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

app.put("/api/events/:id/update", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

/* ================= COMMENTS ================= */
app.post("/api/comments/:eventId", async (req, res) => {
  try {
    const { text, user, parentId } = req.body;

    const comment = await Comment.create({
      eventId: req.params.eventId,
      text,
      user,
      parentId: parentId || null
    });

    // Reply Notification
    if (parentId) {
      const parent = await Comment.findById(parentId);
      if (parent) {
        await Notification.create({
          userId: parent.user,
          message: `${user} replied to your comment`
        });
      }
    }

    // Tagging Notification
    const tags = extractTags(text);
    for (let username of tags) {
      const u = await User.findOne({ username });
      if (u) {
        await Notification.create({
          userId: u.username,
          message: `${user} tagged you`
        });
      }
    }

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

app.get("/api/comments/:eventId", async (req, res) => {
  try {
    res.json(await Comment.find({ eventId: req.params.eventId }));
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

app.put("/api/comments/like/:id", async (req, res) => {
  try {
    const c = await Comment.findById(req.params.id);
    const { userId } = req.body;

    if (c.likes.includes(userId)) {
      c.likes = c.likes.filter(i => i !== userId);
    } else {
      c.likes.push(userId);
    }

    await c.save();
    res.json(c);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

app.put("/api/comments/:id", async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { returnDocument: "after" }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

app.delete("/api/comments/:id", async (req, res) => {
  try {
    await Comment.deleteMany({
      $or: [
        { _id: req.params.id },
        { parentId: req.params.id }
      ]
    });
    res.json("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

/* ================= NOTIFICATIONS ================= */
app.get("/api/notifications/:userId", async (req, res) => {
  try {
    res.json(await Notification.find({ userId: req.params.userId }));
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

/* ================= BOOKINGS ================= */
// Booking now stores only what frontend user types
app.post("/api/bookings", async (req, res) => {
  const { eventId, name, email, phone } = req.body;
  if (!eventId || !phone) {
    return res.status(400).json({ error: "Event and phone required" });
  }

  try {
    const booking = await Booking.create({
      event: eventId,
      name: name || "N/A",
      email: email || "N/A",
      phone
    });
    res.json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/bookings/event/:eventId", async (req, res) => {
  try {
    const bookings = await Booking.find({ event: req.params.eventId });
    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/bookings/:bookingId", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.bookingId);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= SERVER ================= */
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
