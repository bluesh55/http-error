import MappingCondition = require('./mapping-condition');
import MappingExpression = require('./mapping-expression');
declare class Mapping {
    errorClassName: string;
    defaultExpression?: MappingExpression;
    conditionExpressions: Array<MappingCondition>;
    constructor(errorClassName: string, defaultExpression?: MappingExpression, conditionExpressions?: Array<MappingCondition>);
}
export = Mapping;
