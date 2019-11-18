import ReplaceRule = require('./replace-rule');

class PresentationalError {
  code: number;
  errorName: string;
  message: string;
  status: number;

  constructor(code: number, errorName: string, message: string, status: number) {
    this.code = code;
    this.errorName = errorName;
    this.message = message;
    this.status = status;
  }

  override(code?: number, message?: string, status?: number) {
    this.code = code || this.code;
    this.message = message || this.message;
    this.status = status || this.status;
  }

  replaceMessage(rules: Array<ReplaceRule> = [], context: any = null) {
    rules.forEach((rule) => {
      let oldValue = rule.key;
      let newValue;

      if (context && rule.variableName) {
        newValue = context[rule.variableName];
      }
      newValue = newValue || rule.value;

      const replaceResult = this._replaceMessage(this.message, oldValue, newValue);
      if (replaceResult) {
        this.message = replaceResult;
      }
    });
  }

  _replaceMessage(text: string, oldValue?: string, newValue?: string): string | undefined {
    if (oldValue && newValue) {
      return text.replace(new RegExp(`\\\${${oldValue}}`, 'g'), newValue)
    }
  }
}

export = PresentationalError;
