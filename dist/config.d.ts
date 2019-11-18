interface PresentationalErrorConfiguration {
    code: number;
    errorName: string;
    message: string;
    status: number;
}
interface ReplaceRuleConfiguration {
    key: string;
    variableName?: string;
    required?: boolean;
    value?: string;
}
interface MappingConfiguration {
    errorClassName: string;
    default: {
        presentationalErrorName: string;
        replaceRules: Array<ReplaceRuleConfiguration>;
    };
    conditions: Array<{
        variableName: string;
        target: string;
        presentationalErrorName: string;
        replaceRules: Array<ReplaceRuleConfiguration>;
    }>;
}
export interface Configuration {
    presentationalErrors: Array<PresentationalErrorConfiguration>;
    mappings: Array<MappingConfiguration>;
}
export interface Configurator {
    initialize(): string;
    load(basePath?: Array<string>): Configuration;
}
export declare const configurator: Configurator;
export {};
