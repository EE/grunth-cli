'use strict';

var findup = require('findup-sync');
var semver = require('semver');
var spawnSync = require('child_process').spawnSync;
var gruntPath = findup('node_modules/grunt-cli/bin/grunt', {cwd: __dirname});

process.title = 'grunth';

var harmonyFlags;
if (semver.satisfies(process.version, '<0.13.0')) {
    harmonyFlags = [
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
} else if (semver.satisfies(process.version, '>=1.0.0')) {
    // In io.js --harmony enables only quite stable features unlike in Node.js 0.12.
    harmonyFlags = ['--harmony'];
} else {
    harmonyFlags = [];
}

module.exports = function cli(params) {
    if (params.indexOf('--version') !== -1 || params.indexOf('-V') !== -1) {
        console.log('grunth-cli v' + require('../package.json').version);
    }

    var ret = spawnSync('node',
        harmonyFlags.concat([gruntPath]).concat(params),
        {
            cwd: process.cwd(),
            stdio: 'inherit',
        }
    );

    process.exit(ret.status);
};
