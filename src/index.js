const Config = require('./config');
const AppBuilder = require('./app-builder');
const config = Config.load();
module.exports = AppBuilder.build(config);
