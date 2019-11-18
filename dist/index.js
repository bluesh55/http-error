"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var config_1 = require("./config");
var app_builder_1 = __importDefault(require("./app-builder"));
var config = config_1.configurator.load();
module.exports = app_builder_1.default.build(config);
