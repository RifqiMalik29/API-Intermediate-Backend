const db = require("../Helper/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = {
  getAllusers: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM auth", (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },

  register: (body) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        const { password } = body;
        if (err) {
          reject(err.message);
        } else {
          bcrypt.hash(password, salt, function (err, hash) {
            const newBody = { ...body, password: hash };
            if (err) {
              reject(err.message);
            } else {
              const sql = "INSERT INTO auth SET ?";
              db.query(sql, newBody, (err, data) => {
                if (err) {
                  reject(err.message);
                } else {
                  resolve(data);
                }
              });
            }
          });
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
            const token = jwt.sign(
              {
                email: dataUser.email,
                id: dataUser.id,
                name: dataUser.first_name,
              },
              process.env.SECRET_KEY
            );

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

  delete: (setID) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM auth WHERE id = ?";
      db.query(sql, setID, (err, data) => {
        const arrayData = 0;
        if (data.affectedRows != arrayData) {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  update: (body, userID) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        const { password } = body;
        bcrypt.hash(password, salt, function (err, hashedPassword) {
          const newBody = { ...body, password: hashedPassword };
          if (err) {
            reject(err);
          } else {
            const { username, email, pin, password } = body;
            const { id } = userID;

            if (username || email || pin || password) {
              const query = `UPDATE auth SET ? WHERE id = ${userID}`;
              db.query(query, newBody, (err, result) => {
                if (!err) {
                  resolve(result);
                } else {
                  reject(err);
                }
              });
            } else {
              reject(err);
            }
          }
        });
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

module.exports = authModel;
