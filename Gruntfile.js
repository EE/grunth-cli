/**
 * grunth-cli
 * https://github.com/EE/grunth-cli
 *
 * Author Michał Gołębiowski <m.goleb@gmail.com>
 * Copyright Laboratorium EE (http://laboratorium.ee/en)
 * Licensed under the MIT license.
 */

'use strict';

const assert = require('assert');
const semver = require('semver');

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    let defaultName = 'default';

    grunt.initConfig({
        eslint: {
            all: {
                src: [
                    'Gruntfile.js',
                ],
            },
        },

        jscs: {
            all: {
                src: [
                    'Gruntfile.js',
                ],
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
        const nodeVersion = semver.valid(process.version);
        if (semver.satisfies(nodeVersion, '>= 0.11')) {
            try {
                /* eslint-disable no-eval */
                eval('function* f() {yield 2;} const g = f(); g.next();');
                /* eslint-ensable no-eval */
            } catch (e) {
                throw new Error('Generators not recognized!');
            }
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
