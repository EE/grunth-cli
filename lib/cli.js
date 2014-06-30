'use strict';

var findup = require('findup-sync');
var spawnSync = require('child_process').spawnSync;
var gruntPath = findup('node_modules/grunt-cli/bin/grunt', {cwd: __dirname});

process.title = 'grunth';

var harmonyFlags = [
    '--harmony_scoping',
//    '--harmony_modules', // We have `require` and ES6 modules are still in flux
//    '--harmony_symbols', // `Symbol('s')` throws
//    '--harmony_proxies', // `new Proxy({}, {})` throws
//    '--harmony_collections', // `new Set([2]).size` should be `1`
    '--harmony_generators',
//    '--harmony_iteration', // no `for-of`, the description must be wrong
    '--harmony_numeric_literals',
    '--harmony_strings',
    '--harmony_arrays',
    '--harmony_maths',
];

module.exports = function cli(params) {
    spawnSync('node',
        harmonyFlags.concat([gruntPath]).concat(params),
        {
            cwd: process.cwd(),
            stdio: 'inherit',
        }
    );
};