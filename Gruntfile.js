/**
 * grunth
 * https://github.com/EE/grunth
 *
 * Author Michał Gołębiowski <m.goleb@gmail.com>
 * Copyright Laboratorium EE (http://laboratorium.ee/en)
 * Licensed under the MIT license.
 */

'use strict';

const assert = require('assert');
const semver = require('semver');

module.exports = function (grunt) {
    const jshintModuleName = 'grunt-contrib-jshint';
    let defaultName = 'default';

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true,
            },
            all: {
                src: ['**/*.js'],
            },
        },
    });

    grunt.loadNpmTasks(jshintModuleName);

    grunt.registerTask('asserts', function () {
        assert.deepEqual(process.execArgv, ['--harmony'], 'The harmony flag wasn\'t passed to the process');
        const nodeVersion = semver.valid(process.version);
        if (semver.satisfies(nodeVersion, '>= 0.11')) {
            try {
                /* jshint evil: true */
                const generatorResult = eval('function* f() {yield 2;} const g = f(); g.next();');
                /* jshint evil: false */
            } catch (e) {
                throw new Error('Generators not recognized!');
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'asserts',
    ]);
};
