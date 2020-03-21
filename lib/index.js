const each = require("async").each;
const mm = require("micromatch");
const zlib = require("zlib");

function plugin({
    src = "**/*.+(html|css|js|json|xml|svg|txt)",
    options = {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11
      }
    },
    overwrite = false
  } = {}) {
  return (files, metalsmith, done) => {
    const filesTbCompressed = mm(Object.keys(files), src);

    each(filesTbCompressed, (file, asyncDone) => {
      const data = files[file];

      zlib.brotliCompress(data.contents, options, (err, output) => {
        if (err) {
          asyncDone(error);
          return;
        }

        if (overwrite) {
          data.contents = output;
        } else {
          const compressedFile = file + ".br";
          files[compressedFile] = Object.assign({}, data);
          files[compressedFile].contents = output;
        }
        asyncDone();
      });
    }, done);
  };
}

module.exports = plugin;
