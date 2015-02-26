'use strict';

const assert = require('assert');

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    let defaultName = 'default';

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

        jscs: {
            all: {
                src: '<%= eslint.all.src %>',
                options: {
                    config: '.jscsrc',
                },
            },
        },
    });

    // Load all grunt tasks matching the `grunt-*` pattern.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('asserts', function () {
        assert(process.execArgv.indexOf('--harmony_scoping') !== -1,
            'The harmony_scoping flag wasn\'t passed to the process');
        try {
            /* eslint-disable no-eval */
            eval('function* f() {yield 2;} const g = f(); g.next();');
            /* eslint-ensable no-eval */
        } catch (e) {
            throw new Error('Generators not recognized!');
        }
    });

    grunt.registerTask('lint', [
        'eslint',
        'jscs',
    ]);

    grunt.registerTask('test', [
        'lint',
        'asserts',
    ]);

    grunt.registerTask(defaultName, ['test']);
};
