import ReplaceRule = require('./replace-rule');
declare class PresentationalError {
    code: number;
    errorName: string;
    message: string;
    status: number;
    constructor(code: number, errorName: string, message: string, status: number);
    override(code?: number, message?: string, status?: number): void;
    replaceMessage(rules?: Array<ReplaceRule>, context?: any): void;
    _replaceMessage(text: string, oldValue?: string, newValue?: string): string | undefined;
}
export = PresentationalError;
