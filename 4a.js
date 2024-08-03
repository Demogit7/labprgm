const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/COLLEGE", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("Failed to connect to MongoDB:", err));

// Create a schema for student data
const studentSchema = new mongoose.Schema({
  usn: String,
  name: String,
  sem: Number,
  year_of_admission: Number
});

// Create a mongoose model
const Student = mongoose.model("Students", studentSchema);

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint to store student data in MongoDB
app.post("/students", async (req, res) => {
  try {
    // Read student data from the request body
    const studentData = req.body;

    // Insert student data into MongoDB collection
    const result = await Student.insertMany(studentData);
    console.log(`Inserted ${result.length} documents into the collection`);
    
    res.status(201).json({ message: `Inserted ${result.length} documents` });
  } catch (err) {
    console.error("Error inserting documents:", err);
    res.status(500).json({ error: "Error inserting documents" });
  }
});

// API endpoint to search for students by partial name
app.get("/students/search", async (req, res) => {
  try {
    const partialName = req.query.partialName;

    if (!partialName) {
      return res.status(400).json({ error: "Partial name parameter is required" });
    }

    const regex = new RegExp(partialName, "i"); // "i" for case-insensitive search

    const students = await Student.find({ name: { $regex: regex } });

    res.status(200).json(students);
  } catch (err) {
    console.error("Error searching for students:", err);
    res.status(500).json({ error: "Error searching for students" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
