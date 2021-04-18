module.exports = class Connector {
  #config;

  constructor(config) {
    this.#config = config;
  }

  connect(app) {}
}