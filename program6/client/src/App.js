import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const url = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/api/fruits`, { name, price });
      console.log("Data sent successfully");
      // Optionally, you can reset the form fields here
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <h1>Fruit Data Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Fruit Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
