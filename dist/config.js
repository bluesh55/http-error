"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var defaultConfig = {
    presentationalErrors: [],
    mappings: []
};
var fileName = 'errors.json';
var fileTemplate = "{\n  \"presentationalErrors\": [\n    {\n      \"code\": 1000,\n      \"errorName\": \"ResourceNotFound\",\n      \"message\": \"${resource} not found.\",\n      \"status\": 404\n    }\n  ],\n  \"mappings\": [\n    {\n      \"errorClassName\": \"ObjectNotFoundError\",\n      \"default\": {\n        \"presentationalErrorName\": \"ResourceNotFound\",\n        \"replaceRules\": [\n          {\n            \"key\": \"resource\",\n            \"variableName\": \"resourceName\",\n            \"value\": \"Resource\"\n          }\n        ]\n      },\n      \"conditions\": [\n        {\n          \"variableName\": \"resourceName\",\n          \"target\": \"Person\",\n          \"presentationalErrorName\": \"ResourceNotFound\",\n          \"replaceRules\": [\n            {\n              \"key\": \"resource\",\n              \"value\": \"User\"\n            }\n          ]\n        }\n      ]\n    }\n  ]\n}\n";
exports.configurator = {
    initialize: function () {
        var filePath = path_1.default.resolve('.', fileName);
        var absoluteDir = path_1.default.dirname(filePath);
        fs_1.default.writeFileSync(filePath, fileTemplate, 'utf8');
        return absoluteDir;
    },
    load: function (basePath) {
        if (basePath === void 0) { basePath = ['.']; }
        var filePath = path_1.default.resolve.apply(path_1.default, __spreadArrays(basePath, [fileName]));
        if (fs_1.default.existsSync(filePath)) {
            var config = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
            return config;
        }
        else {
            if (filePath === path_1.default.resolve('/', fileName)) {
                return defaultConfig;
            }
            else {
                return this.load(__spreadArrays(basePath, ['..']));
            }
        }
    }
};
