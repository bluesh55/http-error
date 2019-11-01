const Config = require('../config');

module.exports = function() {
  const absoluteDir = Config.initialize();
  console.log(`Configuration example file was initialized at ${absoluteDir} 😎`);
};
