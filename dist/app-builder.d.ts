import { Configuration } from './config';
import App = require('./app');
declare class AppBuilder {
    static build(config: Configuration): App;
}
export = AppBuilder;
