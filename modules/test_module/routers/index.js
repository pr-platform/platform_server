const controllers = require('../controllers');

module.exports = [{
  route_name: '/find-all',
  method: 'GET',
  handlers: [controllers.findAll],
}]
