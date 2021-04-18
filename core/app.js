const RouterConnector = require('../connector/routers');

class App {
  #corsConfig;
  #databaseConfig;

  constructor(config) {
    if (!App._instance) {
      this.#corsConfig = config?.cors;
      this.#databaseConfig = config?.database;

      App._instance = this;
    }

    return App._instance;
  }

  static getInstance() {
    return this._instance;
  }

  #setCors() {
    console.log('Cors: success');
  }

  #databaseConnection() {
    console.log('Database connection: success');
  }

  #routersConnection(express) {
    const routerConnector = new RouterConnector(express);

    routerConnector.connect();

    return routerConnector.getRouters();
  }

  async bootstrap() {
    try {
      await this.#databaseConnection();
      const express = require('express');
      const app = express();
      const routers = this.#routersConnection(express)

      app.use('/', routers);
      console.log('Modules connection: success');
      this.#setCors();

      app.listen(3000, () => console.log('Server start: http://localhost:3000'));
    } catch(error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new App();