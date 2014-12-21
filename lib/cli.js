'use strict';

var findup = require('findup-sync');
var spawnSync = require('child_process').spawnSync;
var gruntPath = findup('node_modules/grunt-cli/bin/grunt', {cwd: __dirname});

process.title = 'grunth';

var harmonyFlags = [
    '--es-staging',
    '--harmony_scoping',
//    '--harmony_modules', // We have `require` and ES6 modules are still in flux
//    '--harmony_proxies', // `new Proxy({}, {})` throws
    '--harmony_generators',
    '--harmony_numeric_literals',
    '--harmony_strings',
    '--harmony_arrays',
//    '--harmony_arrow_functions', // No lexical `this`; (function (){return(()=>this)()}.bind(2))() === 2
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
