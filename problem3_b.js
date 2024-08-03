const express = require("express");
const app = express();

// Sample car object
const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2020,
  color: "Black",
};

// API endpoint to get car object properties
app.get("/api/car", (req, res) => {
  res.json(car);
});

// API endpoint to delete the second property and get object length
app.delete("/api/car/:propertyIndex", (req, res) => {
  const propertyIndex = parseInt(req.params.propertyIndex);

  if (
    isNaN(propertyIndex) ||
    propertyIndex < 0 ||
    propertyIndex >= Object.keys(car).length
  ) {
    return res.status(400).json({ error: "Invalid property index" });
  }

  const propertyToDelete = Object.keys(car)[propertyIndex];
  delete car[propertyToDelete];

  res.json({
    deletedProperty: propertyToDelete,
    remainingProperties: Object.keys(car),
    objectLength: Object.keys(car).length,
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
