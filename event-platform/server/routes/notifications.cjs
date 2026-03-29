const router = require("express").Router();
const Notification = require("../models/Notification");

router.get("/:userId", async (req,res)=>{
  const n = await Notification.find({userId:req.params.userId});
  res.json(n);
});

module.exports = router;