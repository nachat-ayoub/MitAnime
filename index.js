const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// Mongoose:
mongoose
  .connect(process.env.DB_URI)
  .then((res) => console.log("db connected...!\n"))
  .catch((err) => console.log(err));

// Middlewares :
// set PORT=3006 &&
app.use(
  // cors()
  cors({
    origin: ["https://mitanime.netlify.app"],
    methods: "GET",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes :
const witAnimeRoutes = require("./routes/witAnimeRoutes");

app.use("/api", witAnimeRoutes);

//
//
//

app.get("*", (req, res) => {
  res.redirect("/api/docs");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running On http://localhost:${process.env.PORT}`);
});
