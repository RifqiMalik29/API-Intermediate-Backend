const uploadRoute = require("express").Router();
const uploadController = require("../Controller/upload");
const verifyToken = require("../Helper/Middleware/verifyToken");

// uploadRoute.get('/', verifyToken, uploadController.upload)
uploadRoute.post("/", verifyToken, uploadController.uploadImage);

module.exports = uploadRoute;
