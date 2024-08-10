const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/COLLEGE", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection failed:", err));

const Student = mongoose.model("Student", {
  usn: String,
  name: String,
  sem: Number,
  year_of_admission: Number,
});

const app = express().use(express.json());

app.post("/students", async (req, res) => {
  try {
    res.status(201).json(await Student.insertMany(req.body));
  } catch {
    res.status(500).json({ error: "Insertion error" });
  }
});

app.get("/students/search", async (req, res) => {
  try {
    res.status(200).json(await Student.find({name: { $regex: req.query.partialName, $options: "i" }, }));
  } 
  catch {res.status(500).json({ error: "Search error" }); }
});

app.listen(3000, () => console.log("Server running on port 3000"));
