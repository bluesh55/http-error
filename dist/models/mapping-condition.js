"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MappingExpression = require("./mapping-expression");
var MappingCondition = /** @class */ (function (_super) {
    __extends(MappingCondition, _super);
    function MappingCondition(variableName, target, presentationalErrorName, replaceRules) {
        if (replaceRules === void 0) { replaceRules = []; }
        var _this = _super.call(this, presentationalErrorName, replaceRules) || this;
        _this.variableName = variableName;
        _this.target = target;
        return _this;
    }
    return MappingCondition;
}(MappingExpression));
module.exports = MappingCondition;
