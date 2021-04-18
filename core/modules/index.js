module.exports = class AppModule {
  #routerConfig;

  constructor(config) {
    this.#routerConfig = config.router;
  }

  get getRouterConfig() {
    return this.#routerConfig;
  }

  set setRouterConfig(config) {
    
  }
}