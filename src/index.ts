import { configurator } from './config';
import AppBuilder from './app-builder';
const config = configurator.load();
export = AppBuilder.build(config);
