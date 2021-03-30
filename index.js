const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
//bodyparser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const crudRoutes = require("./routes/crud");
app.use(crudRoutes);
//connect to database
mongoose.connect(
  process.env.database_string,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to database");
  }
);
app.listen(process.env.PORT || 5000, () => {
  console.log("The server is running");
});
