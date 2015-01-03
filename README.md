# grunth-cli [![Build Status](https://travis-ci.org/EE/grunth-cli.svg?branch=master)](https://travis-ci.org/EE/grunth-cli)

> Runs grunt with the --harmony_scoping flag.

## Description
This package exposes the `grunth` shell command that works like `grunt` but fires it using
the node `--harmony_scoping` flag. Thanks to that you can use `const`/`let` block scoping that so far has only an experimental implementation in Node.

The module is a replacement for the `grunt-cli` package.

To install the module globally:

```shell
npm -g install grunth-cli
```

Once the module has been installed, in every project that uses Grunt you can replace `grunt` with `grunth` in your commands, like:

```sh
grunth sass
```

Note that, like before, apart from installing the `grunth-cli` global module, you need to install the `grunt` package locally in every project, like:
```shell
npm install grunt --save-dev
```

## Installing grunt-cli locally
If you prefer the idiomatic Node.js method to get started with a project (`npm install && npm test`) then install `grunth-cli` locally with `npm install grunth-cli --save-dev`. Then add a script to your `package.json` to run the associated grunt command: `"scripts": { "test": "grunth test" } `. Now `npm test` will use the locally installed `./node_modules/.bin/grunth` executable to run your Grunt commands.

To read more about npm scripts, please visit the npm docs: [https://npmjs.org/doc/misc/npm-scripts.html](https://npmjs.org/doc/misc/npm-scripts.html).

## License
Copyright (c) 2014 Laboratorium EE. Licensed under the MIT license.
