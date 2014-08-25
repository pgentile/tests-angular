#!/bin/bash -ex

npm install
node node_modules/grunt-protractor-runner/scripts/webdriver-manager-update
bower install
grunt dist

