"use strict";
var Mapping = /** @class */ (function () {
    function Mapping(errorClassName, defaultExpression, conditionExpressions) {
        if (conditionExpressions === void 0) { conditionExpressions = []; }
        this.errorClassName = errorClassName;
        this.defaultExpression = defaultExpression;
        this.conditionExpressions = conditionExpressions;
    }
    return Mapping;
}());
module.exports = Mapping;
