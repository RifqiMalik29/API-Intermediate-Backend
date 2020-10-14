const db = require("../Helper/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userModel = {
  getAllusers: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM auth", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.log(err.message);
        }
      });
    });
  },

  pagination: (query) => {
    return new Promise((resolve, reject) => {
      const { page, limit } = query;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      db.query("SELECT * FROM auth", (err, result) => {
        if (!err) {
          const resultUsers = result.slice(startIndex, endIndex);
          resolve(resultUsers);
        } else {
          reject(err);
        }
      });
    });
  },

  userID: (params) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM auth WHERE id = ?`, params.id, (err, result) => {
        if (!err) {
          resolve(result[0]);
        } else {
          reject(err);
        }
      });
    });
  },

  login: (body) => {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      const sql = "SELECT * FROM auth WHERE email = ?";
      db.query(sql, email, (err, data) => {
        let dataUser = data[0];
        if (!data.length) {
          reject("Wrong Email / Password");
        } else {
          if (!err) {
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign(
              {
                id: dataUser.id,
                name: dataUser.name,
                email: dataUser.email,
              },
              secretKey
            );

            // Token admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZV9pZCI6MjAsImlhdCI6MTYwMjY5ODU3MH0.cbKr1fnQtfQMqLCbTtpVVT2W1wYqK9JaeybOCLCzaws

            // Token user : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZV9pZCI6MjEsImlhdCI6MTYwMjY5NDM4NX0.0h8NLcHGPgfS27cDX-BO1h5WuWNGnRb0Z0iQJNK_U_o

            // Check Password
            bcrypt.compare(password, dataUser.password, (err, result) => {
              if (err) {
                reject("Wrong Email / Password");
              } else {
                if (!result) {
                  reject("Wrong Email / Password");
                } else {
                  const sql = "SELECT * FROM auth WHERE password = ?";
                  db.query(sql, dataUser.password, (err, result) => {
                    if (!err) {
                      resolve(token);
                    } else {
                      reject("Wrong Email / Password");
                    }
                  });
                }
              }
            });
          } else {
            reject(err);
          }
        }
      });
    });
  },

  searchName: (query) => {
    return new Promise((resolve, reject) => {
      const { username } = query;
      let sql = `SELECT * FROM auth WHERE (username) LIKE '%${username}%' ORDER BY username ASC`;
      db.query(sql, (err, result) => {
        let array = [];
        if (result.length === array.length) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = userModel;
