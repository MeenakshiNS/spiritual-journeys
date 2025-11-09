// server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = "data.json";

app.use(cors());
app.use(express.json());
app.use(express.static(".")); // Serve HTML, CSS, JS, and data.json

// ✅ Fetch supplier data
app.get("/data", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading data.json" });
    res.json(JSON.parse(data || "[]"));
  });
});

// ✅ Save updated supplier data
app.post("/data", (req, res) => {
  fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Error writing to data.json" });
    res.json({ success: true });
  });
});

// ✅ Serve the frontend
app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
