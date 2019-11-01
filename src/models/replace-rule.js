class ReplaceRule {
  constructor({
    key,
    variableName,
    required,
    value
  } = {}) {
    Object.assign(this, {
      key,
      variableName,
      required: !!required,
      value
    });
  }
}

module.exports = ReplaceRule;
