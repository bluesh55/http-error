const _ = require('lodash');
const PresentationalError = require('./models/presentational-error');

class App {
  constructor({
    presentationalErrors = [],
    mappings = []
  } = {}) {

    this.presentationalErrors = presentationalErrors;
    this.mappings = mappings;
  }

  /*
   * presentationalErrorName(string): Name of presentational error.
   * options(object):
   *  - code(number): The code that override original code of error.
   *  - message(string): The message that override original message of error.
   *  - status(number): The status that override original status of error.
   *  - replaceRules(object): The replacement rules.
   *    - key(string): The key of message template. For instance, the key of '${fruit}' is 'fruit' .
   *    - value(string): Replaced text.
   */
  generate(presentationalErrorName, options = {}) {
    const replaceRules = options.replaceRules || [];
    const presentationalError = this._findAndClonePresentationalErrorByName(presentationalErrorName);
    if (!presentationalError) {
      return null;
    }

    presentationalError.override({
      code: options.code,
      message: options.message,
      status: options.status
    });

    presentationalError.replaceMessage(replaceRules);

    return presentationalError;
  }

  map(error) {
    const mapping = this._findMappingByErrorClassName(error.constructor.name);
    if (!mapping) {
      return null;
    }

    let mappedPresentationalError = null;

    // condition
    if (mapping.conditionExpressions && mapping.conditionExpressions.constructor === Array) {
      let matchedCondition = mapping.conditionExpressions.find((condition) => {
        return condition.variableName &&
          condition.target &&
          error[condition.variableName] === condition.target;
      });

      if (matchedCondition) {
        mappedPresentationalError = this._findAndClonePresentationalErrorByName(matchedCondition.presentationalErrorName);
      }

      if (mappedPresentationalError) {
        mappedPresentationalError.replaceMessage(matchedCondition.replaceRules, error);
      }
    }


    // default
    if (mapping.defaultExpression && !mappedPresentationalError) {
      mappedPresentationalError = this._findAndClonePresentationalErrorByName(mapping.defaultExpression.presentationalErrorName);

      if (mappedPresentationalError) {
        mappedPresentationalError.replaceMessage(mapping.defaultExpression.replaceRules, error);
      }
    }

    return mappedPresentationalError;
  }

  _findAndClonePresentationalErrorByName(errorName) {
    let found = this.presentationalErrors.find((error) => {
      return error.errorName === errorName
    });

    if (found) {
      found = _.cloneDeep(found);
    }

    return found;
  }

  _findMappingByErrorClassName(errorClassName) {
    return this.mappings.find((mapping) => {
      return mapping.errorClassName === errorClassName
    });
  }
}

module.exports = App;
