const findAllService = require('../services/findAll');

module.exports = async (req, res) => {
  res.status(200).send(findAllService());
}
