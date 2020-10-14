const pagesRouter = require("express").Router();

pagesRouter.get("/zwallet", (req, res) => {
  res.render("index");
});
pagesRouter.get("/register", (req, res) => {
  res.render("register");
});
pagesRouter.get("/login", (req, res) => {
  res.render("login");
});
module.exports = pagesRouter;
