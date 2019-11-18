"use strict";
var config_1 = require("../config");
module.exports = function () {
    var absoluteDir = config_1.configurator.initialize();
    console.log("Configuration example file was initialized at " + absoluteDir + " \uD83D\uDE0E");
};
