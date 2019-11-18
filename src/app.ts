import _ from 'lodash';
import PresentationalError = require('./models/presentational-error');
import Mapping = require('./models/mapping');
import RuntimeError = require('./runtime-error');

class App {
  constructor(private presentationalErrors: Array<PresentationalError> = [], private mappings: Array<Mapping> = []) {}

  generate(
    presentationalErrorName: string,
    options: {
      code?: number;
      message?: string;
      status?: number;
      replaceRules?: Array<{ key: string, value: string }>;
    } = {}
  ): PresentationalError | undefined {
    const replaceRules = options.replaceRules || [];
    const presentationalError = this._findAndClonePresentationalErrorByName(presentationalErrorName);
    if (!presentationalError) {
      return undefined;
    }

    presentationalError.override(
      options.code,
      options.message,
      options.status
    );

    presentationalError.replaceMessage(replaceRules);

    return presentationalError;
  }

  map(error: RuntimeError): PresentationalError | undefined {
    const mapping = this._findMappingByErrorClassName(error.constructor.name);
    if (!mapping) {
      return undefined;
    }

    let mappedPresentationalError = undefined;

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
        mappedPresentationalError.replaceMessage(matchedCondition!.replaceRules, error);
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

  _findAndClonePresentationalErrorByName(errorName: string): PresentationalError | undefined {
    let found = this.presentationalErrors.find((error) => {
      return error.errorName === errorName
    });

    if (found) {
      found = _.cloneDeep(found);
    }

    return found;
  }

  _findMappingByErrorClassName(errorClassName: string): Mapping | undefined {
    return this.mappings.find((mapping) => {
      return mapping.errorClassName === errorClassName
    });
  }
}

export = App;
