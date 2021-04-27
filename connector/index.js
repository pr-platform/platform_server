const fs = require('fs');

module.exports = class ModuleConnector {
  #modulesFolderName = 'modules';

  constructor(router) {
    this.router = router;
  }

  #getModules() {
    return fs.readdirSync(
      `./${this.#modulesFolderName}`).map(name => require(`../${this.#modulesFolderName}/${name}`
    ));
  }

  #createModule(module) {
    if (module.routers && module.routers.length) {
      module.routers.forEach(router => this.#createRouter(module.base_route_name, router));
    } else {
      console.info(`Routers in module ${module.base_route_name} is not found`);
    }
    console.info(`Module ${module.base_route_name} connect: success`);
  }

  #createRouter(base_route_name, router) {
    this.router[router.method.toLowerCase()](
      `${base_route_name}${router.route_name}`, ...router.handlers,
    );
  }

  connect() {
    this.#getModules().forEach(module => this.#createModule(module));
    return this.router;
  }
}
