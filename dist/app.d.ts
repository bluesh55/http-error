import PresentationalError = require('./models/presentational-error');
import Mapping = require('./models/mapping');
import RuntimeError = require('./runtime-error');
declare class App {
    private presentationalErrors;
    private mappings;
    constructor(presentationalErrors?: Array<PresentationalError>, mappings?: Array<Mapping>);
    generate(presentationalErrorName: string, options?: {
        code?: number;
        message?: string;
        status?: number;
        replaceRules?: Array<{
            key: string;
            value: string;
        }>;
    }): PresentationalError | undefined;
    map(error: RuntimeError): PresentationalError | undefined;
    _findAndClonePresentationalErrorByName(errorName: string): PresentationalError | undefined;
    _findMappingByErrorClassName(errorClassName: string): Mapping | undefined;
}
export = App;
