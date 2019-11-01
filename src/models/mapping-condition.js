const MappingExpression = require('./mapping-expression');

class MappingCondition extends MappingExpression {
  constructor({
    variableName,
    target,
    presentationalErrorName,
    replaceRules = []
  } = {}) {
    super({
      presentationalErrorName,
      replaceRules
    });

    Object.assign(this, {
      variableName,
      target
    });
  }
}

module.exports = MappingCondition;
