#!/usr/bin/env node

const initCommand = require('../src/cli/init');

function help() {
  console.log('Usage: http-error-cli [command]\n');
  console.log('Commands');
  console.log(' - init: initialize json config file');
}

const command = process.argv[2];

switch(command) {
  case 'init':
    initCommand();
    break;
  default:
    help();
    break;
}
