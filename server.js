const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const userRoute = require("./src/Router/users");
const authRoute = require("./src/Router/auth");
const pagesRouter = require("./src/Router/pages");
require("dotenv").config();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// View engine
app.set("view engine", "hbs");

// Router
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/", pagesRouter);

//
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Success running on port ${port}`);
});
