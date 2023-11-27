const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use("*", cors());

const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/document")

app.use("/api", authRoutes);
app.use("/api",documentRoutes);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connection is successful");
  });

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
