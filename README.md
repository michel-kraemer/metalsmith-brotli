# metalsmith-brotli [![CircleCI](https://img.shields.io/circleci/project/michel-kraemer/metalsmith-brotli.svg)](https://circleci.com/gh/michel-kraemer/metalsmith-brotli) [![npm](https://img.shields.io/npm/v/metalsmith-brotli.svg?maxAge=2592000)](https://www.npmjs.com/package/metalsmith-brotli)

A [Metalsmith](http://metalsmith.io) plugin that creates compressed copies of
the site's content using the [Brotli algorithm](https://github.com/google/brotli).
This is useful if you want to pre-compress static files and serve them via
the [nginx brotli static module (ngx_brotli)](https://github.com/google/ngx_brotli),
for example.

## Installation

```
$ npm install metalsmith-brotli
```

## Usage

```javascript
var Metalsmith = require("metalsmith");
var brotli = require("metalsmith-brotli");

var metalsmith = new Metalsmith(__dirname)
  .use(brotli());
```

`metalsmith-brotli` will compress a file if the extension matches this regular
expression:

```javascript
/\.[html|css|js|json|xml|svg|txt]/
```

The choice of files to compress is loosely based on the
[HTML5 Boilerplate server configuration](https://github.com/h5bp/server-configs-apache).

The plugin compresses each matching file. Depending on the `overwrite` options
(see below) the plugin either replaces the original file or creates a new one
with the `.br` extension.

### Customization

Pass an options object to customize metalsmith-brotli's behaviour. These are
the available options keys:

`src` is a [multimatch](https://github.com/sindresorhus/multimatch) pattern
which specifies which types of files to compress.

```javascript
var metalsmith = new Metalsmith(__dirname)
  .use(compress({
    src: ['**/*.js', '**/*.css'] // only compress JavaScript and CSS
  }));
```

`brotli` is the same configuration object accepted by
[iltorb.compress](https://github.com/mayhemydg/iltorb). For example, you can
set the compression level as follows:

```javascript
var metalsmith = new Metalsmith(__dirname)
  .use(compress({
    src: ['**/*.js', '**/*.css'],
    brotli: {
      quality: 11
    }
}));
```

Add `overwrite: true` to replace files with the compressed version instead of
creating a copy with the `.br` extension:

```javascript
var metalsmith = new Metalsmith(__dirname)
  .use(compress({
    overwrite: true
  });
```

### Deployment

You need to create a script to upload the compressed versions of the files to
your preferred hosting provider yourself. Take care to serve the files with the
correct Content-Encoding.

## Acknowledgements

This plugin is based on [metalsmith-gzip](https://github.com/ludovicofischer/metalsmith-gzip)
by Ludovico Fischer, licensed under the MIT License.

## License

metalsmith-brotli is released under the **MIT license**. See the
[LICENSE](LICENSE) file for more information.
