import ReplaceRule = require('./replace-rule');

class MappingExpression {
  presentationalErrorName: string;
  replaceRules: Array<ReplaceRule>;

  constructor(presentationalErrorName: string, replaceRules: Array<ReplaceRule> = []) {
    this.presentationalErrorName = presentationalErrorName;
    this.replaceRules = replaceRules;
  }
}

export = MappingExpression;
