const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req,res)=>{
  const user = await User.create(req.body);
  res.json(user);
});

router.post("/login", async (req,res)=>{
  const user = await User.findOne(req.body);
  res.json(user);
});

module.exports = router;