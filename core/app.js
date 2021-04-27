const ModuleConnector = require('../connector');

class App {
  constructor(config) {
    this.config = config;
  }

  static getInstance() {
    return this._instance;
  }

  #routersConnection(router) {
    return new ModuleConnector(router).connect();
  }

  async bootstrap() {
    try {
      const express = require('express');
      const app = express();
      const routers = this.#routersConnection(express.Router());

      app.use('/', routers);

      app.listen(3000, () => console.log('Server start: http://localhost:3000'));
    } catch(error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new App();
