import { configurator } from '../config';

export = function() {
  const absoluteDir = configurator.initialize();
  console.log(`Configuration example file was initialized at ${absoluteDir} 😎`);
};
