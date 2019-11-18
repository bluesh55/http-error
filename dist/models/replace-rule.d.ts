declare class ReplaceRule {
    key: string;
    variableName?: string;
    required?: boolean;
    value?: string;
    constructor(key: string, variableName?: string, required?: boolean, value?: string);
}
export = ReplaceRule;
