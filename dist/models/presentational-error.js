"use strict";
var PresentationalError = /** @class */ (function () {
    function PresentationalError(code, errorName, message, status) {
        this.code = code;
        this.errorName = errorName;
        this.message = message;
        this.status = status;
    }
    PresentationalError.prototype.override = function (code, message, status) {
        this.code = code || this.code;
        this.message = message || this.message;
        this.status = status || this.status;
    };
    PresentationalError.prototype.replaceMessage = function (rules, context) {
        var _this = this;
        if (rules === void 0) { rules = []; }
        if (context === void 0) { context = null; }
        rules.forEach(function (rule) {
            var oldValue = rule.key;
            var newValue;
            if (context && rule.variableName) {
                newValue = context[rule.variableName];
            }
            newValue = newValue || rule.value;
            var replaceResult = _this._replaceMessage(_this.message, oldValue, newValue);
            if (replaceResult) {
                _this.message = replaceResult;
            }
        });
    };
    PresentationalError.prototype._replaceMessage = function (text, oldValue, newValue) {
        if (oldValue && newValue) {
            return text.replace(new RegExp("\\${" + oldValue + "}", 'g'), newValue);
        }
    };
    return PresentationalError;
}());
module.exports = PresentationalError;
