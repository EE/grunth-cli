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
        assert.deepEqual(process.execArgv, ['--harmony_scoping'], 'The harmony flag wasn\'t passed to the process');
    });

    grunt.registerTask('test', [
        'jshint',
        'asserts',
    ]);
};
