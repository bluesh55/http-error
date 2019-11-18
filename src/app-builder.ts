import { Configuration } from './config';
import App = require('./app');
import PresentationalError = require('./models/presentational-error');
import Mapping = require('./models/mapping');
import MappingExpression = require('./models/mapping-expression');
import MappingCondition = require('./models/mapping-condition');
import ReplaceRule = require('./models/replace-rule');

class AppBuilder {
  static build(config: Configuration) {
    const presentationalErrors = config.presentationalErrors.map((perr) => {
      return new PresentationalError(
        perr.code,
        perr.errorName,
        perr.message,
        perr.status
      );
    });

    const mappings = config.mappings.map((m) => {
      const errorClassName = m.errorClassName;
      let defaultExpression;
      let conditionExpressions: Array<MappingCondition> = [];

      if (m.default) {
        let replaceRules: Array<ReplaceRule> = [];

        if (m.default.replaceRules) {
          replaceRules = m.default.replaceRules.map((replaceRule) => {
            return new ReplaceRule(
              replaceRule.key,
              replaceRule.variableName,
              replaceRule.required,
              replaceRule.value
            )
          });
        }

        defaultExpression = new MappingExpression(
          m.default.presentationalErrorName,
          replaceRules
        )
      }

      if (m.conditions && m.conditions.constructor === Array) {
        conditionExpressions = m.conditions.map((condition) => {
          let replaceRules: Array<ReplaceRule> = [];
          if (condition.replaceRules) {
            replaceRules = condition.replaceRules.map((replaceRule) => {
              return new ReplaceRule(
                replaceRule.key,
                replaceRule.variableName,
                replaceRule.required,
                replaceRule.value
              )
            });
          }

          return new MappingCondition(
            condition.variableName,
            condition.target,
            condition.presentationalErrorName,
            replaceRules
          );
        });
      }

      return new Mapping(
        errorClassName,
        defaultExpression,
        conditionExpressions
      );
    });

    return new App(presentationalErrors, mappings);
  }
}

export = AppBuilder;
