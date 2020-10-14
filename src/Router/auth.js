const authController = require("../Controller/auth");
const authRoute = require("express").Router();

authRoute.get("/show/admins", authController.getAllusers);
authRoute.get("/login", authController.login);
authRoute.get("/search", authController.searchName);
authRoute.post("/register", authController.register);
authRoute.put("/update/:id", authController.update);
authRoute.delete("/delete/:id", authController.delete);

module.exports = authRoute;
