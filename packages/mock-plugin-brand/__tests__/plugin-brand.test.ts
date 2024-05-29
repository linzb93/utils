'use strict';

const pluginBrand = require('..');
const assert = require('assert').strict;

assert.strictEqual(pluginBrand(), 'Hello from pluginBrand');
console.info("pluginBrand tests passed");
