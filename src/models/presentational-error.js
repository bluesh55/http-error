class PresentationalError {
  constructor({ code, errorName, message, status } = {}) {
    Object.assign(this, {
      code,
      errorName,
      message,
      status
    });
  }

  override({ code, message, status }) {
    this.code = code || this.code;
    this.message = message || this.message;
    this.status = status || this.status;
  }

  replaceMessage(rules = [], context = null) {
    rules.forEach((rule) => {
      let oldValue = rule.key;
      let newValue;

      if (context && rule.variableName) {
        newValue = context[rule.variableName];
      }
      newValue = newValue || rule.value;

      this.message = this._replaceMessage(this.message, oldValue, newValue);
    });
  }

  _replaceMessage(text, oldValue, newValue) {
    return text.replace(new RegExp(`\\\${${oldValue}}`, 'g'), newValue)
  }
}

module.exports = PresentationalError;
