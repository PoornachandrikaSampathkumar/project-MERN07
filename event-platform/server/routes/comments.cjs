const router = require("express").Router();
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const User = require("../models/User");

// TAG DETECTION
const extractTags = (text)=>{
  const regex = /@(\w+)/g;
  return [...text.matchAll(regex)].map(m=>m[1]);
};

// CREATE COMMENT / REPLY
router.post("/:eventId", async (req,res)=>{
  const { text, user, parentId } = req.body;

  const comment = await Comment.create({
    eventId: req.params.eventId,
    text,
    user,
    parentId
  });

  // REPLY NOTIFICATION
  if(parentId){
    const parent = await Comment.findById(parentId);
    await Notification.create({
      userId: parent.user,
      message: `${user} replied to your comment`
    });
  }

  // TAG USERS
  const tags = extractTags(text);
  for(let username of tags){
    const u = await User.findOne({username});
    if(u){
      await Notification.create({
        userId: u._id,
        message: `${user} tagged you`
      });
    }
  }

  res.json(comment);
});

// GET COMMENTS
router.get("/:eventId", async (req,res)=>{
  const data = await Comment.find({eventId: req.params.eventId});
  res.json(data);
});

// LIKE
router.put("/like/:id", async (req,res)=>{
  const c = await Comment.findById(req.params.id);
  const { userId } = req.body;

  if(c.likes.includes(userId)){
    c.likes = c.likes.filter(i=>i!==userId);
  } else {
    c.likes.push(userId);
  }

  await c.save();
  res.json(c);
});

// EDIT
router.put("/:id", async (req,res)=>{
  const c = await Comment.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new:true }
  );
  res.json(c);
});

// DELETE (WITH REPLIES)
router.delete("/:id", async (req,res)=>{
  await Comment.deleteMany({
    $or:[
      {_id:req.params.id},
      {parentId:req.params.id}
    ]
  });
  res.json("Deleted");
});

module.exports = router;