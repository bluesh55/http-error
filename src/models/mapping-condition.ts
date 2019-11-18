import ReplaceRule = require('./replace-rule');
import MappingExpression = require('./mapping-expression');

class MappingCondition extends MappingExpression {
  variableName: string;
  target: string;

  constructor(variableName: string, target: string, presentationalErrorName: string, replaceRules: Array<ReplaceRule> = []) {
    super(
      presentationalErrorName,
      replaceRules
    );

    this.variableName = variableName;
    this.target = target;
  }
}

export = MappingCondition;
