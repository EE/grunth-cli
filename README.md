# grunth [![Build Status](https://travis-ci.org/EE/grunth.svg?branch=master)](https://travis-ci.org/EE/grunth)

> Runs grunt with the --harmony flag.

## Description
This package exposes the `grunth` shell command that works like `grunt` but fires it using
the node `--harmony` flag. Thanks to that, you can use ECMAScript 6 features that have experimental
implementation in Node, like `const`/`let` block scoping, generators etc.

To install and add the module to `package.json` devDependencies, invoke:

```shell
npm install grunth --save-dev
```

Once the module has been installed, just replace `grunt` with `grunth` in your commands, like:

```sh
grunth sass
```

## License
Copyright (c) 2014 Laboratorium EE. Licensed under the MIT license.
