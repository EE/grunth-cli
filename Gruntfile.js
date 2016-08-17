'use strict';

var semver = require('semver');

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    var oldNode = /^v0\./.test(process.version);

    // Support: Node.js <4
    // Skip running tasks that dropped support for Node.js 0.10 & 0.12
    // in those Node versions.
    var runIfNewNode = function (task) {
        return oldNode ? 'print_old_node_message:' + task : task;
    };

    grunt.initConfig({
        eslint: {
            all: {
                src: [
                    '*.js',
                    'bin/grunth',
                    'lib/*.js',
                ],
            },
        },
    });

    // Load grunt tasks from NPM packages
    // Support: Node.js <4
    // Don't load the eslint task in old Node.js, it won't parse.
    require('load-grunt-tasks')(grunt, {
        pattern: oldNode ? ['grunt-*', '!grunt-eslint'] : ['grunt-*'],
    });

    // Supports: Node.js <4
    grunt.registerTask('print_old_node_message', function () {
        var task = [].slice.call(arguments).join(':');
        grunt.log.writeln('Old Node.js detected, running the task "' + task + '" skipped...');
    });

    grunt.registerTask('asserts', function () {
        try {
            /* eslint-disable no-eval */
            eval('function* f() {yield 2;} var g = f(); g.next();');
            /* eslint-ensable no-eval */
        } catch (e) {
            throw new Error('Generators not recognized!');
        }
        grunt.log.writeln('Generators recognized.');

        try {
            /* eslint-disable no-eval */
            eval('function f() {"use strict"; const x = 2; let y = 3; return [x, y];} f();');
            /* eslint-ensable no-eval */
        } catch (e) {
            throw new Error('Block scoping (const/let) not recognized!');
        }
        grunt.log.writeln('Block scoping (const/let) recognized.');

        if (semver.satisfies(process.version, '>=1.0.0')) {
            if (process.execArgv.indexOf('--harmony') === -1) {
                throw new Error('The --harmony flag was not passed!');
            }
            grunt.log.writeln('The --harmony flag was passed.');
        }
    });

    grunt.registerTask('lint', [
        runIfNewNode('eslint'),
    ]);

    grunt.registerTask('test', [
        'lint',
        'asserts',
    ]);

    grunt.registerTask('default', ['test']);
};
