const router = require("express").Router();
const Event = require("../models/Event");

router.post("/", async (req,res)=>{
  const e = await Event.create(req.body);
  res.json(e);
});

router.get("/", async (req,res)=>{
  const e = await Event.find();
  res.json(e);
});

router.put("/:id/update", async (req,res)=>{
  const e = await Event.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(e);
});

router.delete("/:id", async (req,res)=>{
  await Event.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;