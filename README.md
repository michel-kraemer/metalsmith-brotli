# metalsmith-brotli ![Node.js CI](https://github.com/michel-kraemer/metalsmith-brotli/workflows/Node.js%20CI/badge.svg) [![npm](https://img.shields.io/npm/v/metalsmith-brotli.svg)](https://www.npmjs.com/package/metalsmith-brotli)

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
const Metalsmith = require("metalsmith");
const brotli = require("metalsmith-brotli");

let metalsmith = new Metalsmith(__dirname)
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
let metalsmith = new Metalsmith(__dirname)
  .use(compress({
    src: ["**/*.js", "**/*.css"] // only compress JavaScript and CSS
  }));
```

`options` is of type [BrotliOptions](https://nodejs.org/api/zlib.html#zlib_class_brotlioptions).
For example, you can set the compression level as follows:

```javascript
const zlib = require("zlib");

let metalsmith = new Metalsmith(__dirname)
  .use(compress({
    src: ["**/*.js", "**/*.css"],
    options: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11
      }
    }
  }));
```

Add `overwrite: true` to replace files with the compressed version instead of
creating a copy with the `.br` extension:

```javascript
let metalsmith = new Metalsmith(__dirname)
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
