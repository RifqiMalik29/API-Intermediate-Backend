const formResponse = require("../Helper/response");
const userModel = require("../Models/users");

module.exports = {
  getAllusers: (req, res) => {
    userModel
      .getAllusers()
      .then((data) => formResponse(data, res, 200))
      .catch((err) => err);
  },

  userID: (req, res) => {
    userModel
      .userID(req.params)
      .then((data) => formResponse(data, res, 200))
      .catch((err) => err);
  },

  login: (req, res) => {
    userModel
      .login(req.body)
      .then((data) => formResponse(data, res, 200))
      .catch((err) => err);
  },

  pagination: (req, res) => {
    userModel
      .pagination(req.query)
      .then((data) => formResponse(data, res, 200))
      .catch((err) => err);
  },

  searchName: (req, res) => {
    userModel
      .searchName(req.query)
      .then((data) => formResponse(data, res, 200))
      .catch((err) => err);
  },
};
