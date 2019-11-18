"use strict";
var MappingExpression = /** @class */ (function () {
    function MappingExpression(presentationalErrorName, replaceRules) {
        if (replaceRules === void 0) { replaceRules = []; }
        this.presentationalErrorName = presentationalErrorName;
        this.replaceRules = replaceRules;
    }
    return MappingExpression;
}());
module.exports = MappingExpression;
