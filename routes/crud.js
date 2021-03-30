const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const fs = require("fs");
router.get("/", async (req, res, next) => {
  if (req.query.title && req.query.content) {
    const docs = await Note.find({
      title: { $regex: req.query.title, $options: "i" },
      content: { $regex: req.query.content, $options: "i" },
    });
    res.status(200).json({ message: "Found", notes: docs });
  } else {
    const docs = await Note.find();
    res.status(200).json({ message: "Found", notes: docs });
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const doc = Note.findById(req.params.id);
    res.status(200).json({ data: doc });
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
});
router.post("/", async (req, res, next) => {
  try {
    if (req.body.title && req.body.content) {
      let note = new Note({
        title: req.body.title,
        content: req.body.content,
      });
      note.img.data = fs.readFileSync(req.body.img);
      note.img.contentType = "image/png";
      const save = await note.save();
      console.log("Note created");
      res.status("200").json({ message: "New note added" });
    }
  } catch (e) {
    console.log(req.body.title, req.body.content, req.body.img, e);
    res.status(404).json({ message: "Please input a valid note", error: e });
    next();
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const reqBody = req.body;
    const doc = await Note.findOneAndUpdate({ _id: req.params.id }, reqBody);
    console.log(doc, reqBody);
    res.status(200).json({ message: "updated" });
  } catch (e) {
    res.status(404).json({ message: e });
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const doc = await Note.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "deleted" });
    next();
  } catch (e) {
    res.status(404).json({ message: e });
  }
});
module.exports = router;
