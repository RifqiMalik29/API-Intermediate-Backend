const authModel = require("../Models/auth");
const formResponse = require("../Helper/response");
const { hash } = require("bcrypt");
require("dotenv").config();

module.exports = {
  getAllusers: (req, res) => {
    authModel
      .getAllusers()
      .then((data) => formResponse(data, res, 200))
      .catch((err) => console.log(err));
  },

  register: (req, res) => {
    authModel
      .register(req.body)
      .then((data) => {
        const { username, email } = req.body;
        res.send({
          status: 201,
          success: true,
          message: "Account Created!",
          data: {
            username: username,
            email: email,
          },
        });
      })
      .catch((err) => {
        res.send({
          status: 400,
          success: false,
          messsage: err.message,
        });
      });
  },

  login: (req, res) => {
    authModel
      .login(req.body)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Login Successfully",
          token: data,
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err,
        });
      });
  },

  update: (req, res) => {
    const { id } = req.params;
    authModel
      .update(req.body, id)
      .then((data) => {
        const { username, email } = req.body;
        res.send({
          status: 201,
          success: true,
          message: "Success Updated",
          data: {
            username: username,
            email: email,
          },
        });
      })
      .catch((err) => {
        res.send({
          status: 400,
          success: false,
          message: err.message,
        });
      });
  },

  delete: (req, res) => {
    authModel
      .delete(req.params.id)
      .then((data) => {
        res.send({
          status: 200,
          success: true,
          message: "User has been deleted",
          data: data,
        });
      })
      .catch((err) => {
        res.send({
          status: 500,
          success: false,
          message: "ID doesn't exist",
        });
      });
  },

  searchName: (req, res) => {
    authModel
      .searchName(req.query)
      .then((data) => {
        res.send({
          status: 200,
          success: true,
          message: "Is she/he/it what you looking for?",
          data: data,
        });
      })
      .catch((err) => {
        res.send({
          status: 404,
          success: false,
          message: "Not Found"
        });
      });
  },
};
