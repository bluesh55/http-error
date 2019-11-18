import ReplaceRule = require('./replace-rule');
declare class MappingExpression {
    presentationalErrorName: string;
    replaceRules: Array<ReplaceRule>;
    constructor(presentationalErrorName: string, replaceRules?: Array<ReplaceRule>);
}
export = MappingExpression;
