class MappingExpression {
  constructor({
    presentationalErrorName,
    replaceRules = []
  } = {}) {
    Object.assign(this, {
      presentationalErrorName,
      replaceRules
    });
  }
}

module.exports = MappingExpression;
