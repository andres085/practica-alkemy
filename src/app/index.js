require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

// db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Test 123." });
});

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
