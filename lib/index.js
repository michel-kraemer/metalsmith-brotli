var compress = require('iltorb').compress,
    each = require('async').each,
    mm = require('micromatch');

function plugin(options) {
    const defaultOptions = {
        src: "**/*.+(html|css|js|json|xml|svg|txt)",
        brotli: {
            quality: 11
        },
        overwrite: false
    };

    if (typeof options === 'object') {
        options = Object.assign(defaultOptions, options);
    } else {
        options = defaultOptions;
    }

    return function(files, metalsmith, done) {
        const filesTbCompressed = mm(Object.keys(files), options.src);

        each(filesTbCompressed, function(file, asyncDone) {
            const data = files[file];

            compress(data.contents, options.brotli, function(err, output) {
                if (err) {
                    asyncDone(error);
                    return;
                }

                if (options.overwrite) {
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
