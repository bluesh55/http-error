"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var lodash_1 = __importDefault(require("lodash"));
var App = /** @class */ (function () {
    function App(presentationalErrors, mappings) {
        if (presentationalErrors === void 0) { presentationalErrors = []; }
        if (mappings === void 0) { mappings = []; }
        this.presentationalErrors = presentationalErrors;
        this.mappings = mappings;
    }
    App.prototype.generate = function (presentationalErrorName, options) {
        if (options === void 0) { options = {}; }
        var replaceRules = options.replaceRules || [];
        var presentationalError = this._findAndClonePresentationalErrorByName(presentationalErrorName);
        if (!presentationalError) {
            return undefined;
        }
        presentationalError.override(options.code, options.message, options.status);
        presentationalError.replaceMessage(replaceRules);
        return presentationalError;
    };
    App.prototype.map = function (error) {
        var mapping = this._findMappingByErrorClassName(error.constructor.name);
        if (!mapping) {
            return undefined;
        }
        var mappedPresentationalError = undefined;
        // condition
        if (mapping.conditionExpressions && mapping.conditionExpressions.constructor === Array) {
            var matchedCondition = mapping.conditionExpressions.find(function (condition) {
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
    };
    App.prototype._findAndClonePresentationalErrorByName = function (errorName) {
        var found = this.presentationalErrors.find(function (error) {
            return error.errorName === errorName;
        });
        if (found) {
            found = lodash_1.default.cloneDeep(found);
        }
        return found;
    };
    App.prototype._findMappingByErrorClassName = function (errorClassName) {
        return this.mappings.find(function (mapping) {
            return mapping.errorClassName === errorClassName;
        });
    };
    return App;
}());
module.exports = App;
