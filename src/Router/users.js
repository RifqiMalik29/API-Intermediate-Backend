const userController = require("../Controller/users");
const verifyToken = require("../Helper/Middleware/verifyToken");
const userRoute = require("express").Router();

userRoute.get("/zwallet", verifyToken, userController.getAllusers);
userRoute.get("/user/:id", verifyToken, userController.userID);
userRoute.get("/login", userController.login);
userRoute.get("/page", userController.pagination);
userRoute.get("/search", userController.searchName);

module.exports = userRoute;
