class Mapping {
  constructor({
    errorClassName,
    defaultExpression = undefined,
    conditionExpressions = []
  } = {}) {
    Object.assign(this, {
      errorClassName,
      defaultExpression,
      conditionExpressions
    });
  }
}

module.exports = Mapping;
