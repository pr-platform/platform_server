module.exports = class RouterConnector {
  constructor(app) {
    this.router = app.Router();
  }

  #createRouter(config) {
    this.router.get('/', (req, res) => {
      res.send('About birds');
    });
  }

  #getModulesConfigs() {}

  connect() {
    this.#createRouter();
  }

  getRouters() {
    return this.router;
  }
}