import ReplaceRule = require('./replace-rule');
import MappingExpression = require('./mapping-expression');
declare class MappingCondition extends MappingExpression {
    variableName: string;
    target: string;
    constructor(variableName: string, target: string, presentationalErrorName: string, replaceRules?: Array<ReplaceRule>);
}
export = MappingCondition;
