import MappingCondition = require('./mapping-condition');
import MappingExpression = require('./mapping-expression');

class Mapping {
  errorClassName: string;
  defaultExpression?: MappingExpression;
  conditionExpressions: Array<MappingCondition>;

  constructor(errorClassName: string, defaultExpression?: MappingExpression, conditionExpressions: Array<MappingCondition> = []) {
    this.errorClassName = errorClassName;
    this.defaultExpression = defaultExpression;
    this.conditionExpressions = conditionExpressions;
  }
}

export = Mapping;
