const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
// Handle POST request to '/api/fruits'
app.post("/api/fruits", (req, res) => {
  const { name, price } = req.body;
  console.log(`Received data from client: Name - ${name}, Price - ${price}`);
  // Here, you can process the data (e.g., save to database) and send back a response if needed
  res.status(200).send("Data received successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
