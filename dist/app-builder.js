"use strict";
var App = require("./app");
var PresentationalError = require("./models/presentational-error");
var Mapping = require("./models/mapping");
var MappingExpression = require("./models/mapping-expression");
var MappingCondition = require("./models/mapping-condition");
var ReplaceRule = require("./models/replace-rule");
var AppBuilder = /** @class */ (function () {
    function AppBuilder() {
    }
    AppBuilder.build = function (config) {
        var presentationalErrors = config.presentationalErrors.map(function (perr) {
            return new PresentationalError(perr.code, perr.errorName, perr.message, perr.status);
        });
        var mappings = config.mappings.map(function (m) {
            var errorClassName = m.errorClassName;
            var defaultExpression;
            var conditionExpressions = [];
            if (m.default) {
                var replaceRules = [];
                if (m.default.replaceRules) {
                    replaceRules = m.default.replaceRules.map(function (replaceRule) {
                        return new ReplaceRule(replaceRule.key, replaceRule.variableName, replaceRule.required, replaceRule.value);
                    });
                }
                defaultExpression = new MappingExpression(m.default.presentationalErrorName, replaceRules);
            }
            if (m.conditions && m.conditions.constructor === Array) {
                conditionExpressions = m.conditions.map(function (condition) {
                    var replaceRules = [];
                    if (condition.replaceRules) {
                        replaceRules = condition.replaceRules.map(function (replaceRule) {
                            return new ReplaceRule(replaceRule.key, replaceRule.variableName, replaceRule.required, replaceRule.value);
                        });
                    }
                    return new MappingCondition(condition.variableName, condition.target, condition.presentationalErrorName, replaceRules);
                });
            }
            return new Mapping(errorClassName, defaultExpression, conditionExpressions);
        });
        return new App(presentationalErrors, mappings);
    };
    return AppBuilder;
}());
module.exports = AppBuilder;
