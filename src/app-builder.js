const App = require('./app');
const PresentationalError = require('./models/presentational-error');
const Mapping = require('./models/mapping');
const MappingExpression = require('./models/mapping-expression');
const MappingCondition = require('./models/mapping-condition');
const ReplaceRule = require('./models/replace-rule');

class AppBuilder {
  static build(config) {
    const presentationalErrors = config.presentationalErrors.map((perr) => {
      return new PresentationalError({
        code: perr.code,
        errorName: perr.errorName,
        message: perr.message,
        status: perr.status
      });
    });

    const mappings = config.mappings.map((m) => {
      const errorClassName = m.errorClassName;
      let defaultExpression;
      let conditionExpressions = [];

      if (m.default) {
        let replaceRules = [];

        if (m.default.replaceRules) {
          replaceRules = m.default.replaceRules.map((replaceRule) => {
            return new ReplaceRule({
              key: replaceRule.key,
              variableName: replaceRule.variableName,
              required: replaceRule.required,
              value: replaceRule.value
            })
          });
        }

        defaultExpression = new MappingExpression({
          presentationalErrorName: m.default.presentationalErrorName,
          replaceRules: replaceRules
        })
      }

      if (m.conditions && m.conditions.constructor === Array) {
        conditionExpressions = m.conditions.map((condition) => {
          let replaceRules = [];
          if (condition.replaceRules) {
            replaceRules = condition.replaceRules.map((replaceRule) => {
              return new ReplaceRule({
                key: replaceRule.key,
                variableName: replaceRule.variableName,
                required: replaceRule.required,
                value: replaceRule.value
              })
            });
          }

          return new MappingCondition({
            variableName: condition.variableName,
            target: condition.target,
            presentationalErrorName: condition.presentationalErrorName,
            replaceRules: replaceRules
          });
        });
      }

      return new Mapping({
        errorClassName,
        defaultExpression,
        conditionExpressions
      });
    });

    return new App({ presentationalErrors, mappings });
  }
}

module.exports = AppBuilder;
