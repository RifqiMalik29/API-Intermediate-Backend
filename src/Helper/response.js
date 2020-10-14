const formResponse = (data, res, status) => {
  return res.status(status).send(data);
};

module.exports = formResponse;
