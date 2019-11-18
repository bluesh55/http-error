"use strict";
var ReplaceRule = /** @class */ (function () {
    function ReplaceRule(key, variableName, required, value) {
        this.key = key;
        this.variableName = variableName;
        this.required = required;
        this.value = value;
    }
    return ReplaceRule;
}());
module.exports = ReplaceRule;
