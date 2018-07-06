var test = require('tape');
var brotli = require('..');
var Metalsmith = require('metalsmith');

test('By default, only the specified files are compressed', function(t) {
    t.plan(9);
    var metalsmith = Metalsmith('test/fixtures/pdf');
    metalsmith
        .use(brotli())
        .build(function(err, files) {
            t.error(err, 'No build errors');
            t.ok(files['style.css.br'], 'The compressed CSS is created');
            t.ok(files['style.css'], 'The original CSS is conserved');
            t.ok(files['index.html.br'], 'The compressed HTML is created');
            t.ok(files['index.html'], 'The original HTML is conserved');
            t.ok(files['document.svg.br'], 'The compressed SVG is created');
            t.ok(files['document.svg'], 'The original SVG is conserved');
            t.notOk(files['document.pdf.br'], 'No compressed PDF is created');
            t.ok(files['document.pdf'], 'The original PDF is conserved');
        });
});

test('Multimatch source definition is followed', function(t) {
    t.plan(9);
    var metalsmith = Metalsmith('test/fixtures/pdf');
    metalsmith
        .use(brotli({ src: ["**/*.css", "**/*.pdf"] }))
        .build(function(err, files) {
            t.error(err, 'No build errors');
            t.ok(files['document.pdf.br'], 'The compressed PDF is created');
            t.ok(files['document.pdf'], 'The original PDF is conserved');
            t.ok(files['style.css.br'], 'The compressed CSS is created');
            t.ok(files['style.css'], 'The original CSS is conserved');
            t.notOk(files['index.html.br'], 'No compressed HTML is created');
            t.ok(files['index.html'], 'The original HTML is conserved');
            t.notOk(files['document.svg.br'], 'No compressed SVG is created');
            t.ok(files['document.svg'], 'The original SVG is conserved');
        });
});

test('Overwrite option has effect', function(t) {
    t.plan(9);
    var metalsmith = Metalsmith('test/fixtures/pdf');
    metalsmith
        .use(brotli({overwrite: true}))
        .build(function(err, files) {
            t.error(err, 'No build errors');
            t.notOk(files['style.css.br'], 'No separate compressed CSS is created');
            t.ok(files['style.css'], 'The original CSS is conserved');
            t.notOk(files['index.html.br'], 'No separate compressed HTML is created');
            t.ok(files['index.html'], 'The original HTML is conserved');
            t.notOk(files['document.svg.br'], 'No separate compressed SVG is created');
            t.ok(files['document.svg'], 'The original SVG is conserved');
            t.notOk(files['document.pdf.br'], 'No compressed PDF is created');
            t.ok(files['document.pdf'], 'The original PDF is conserved');
        });
});

test('Brotli quality option can be set to 11', function(t) {
    t.plan(2);
    var metalsmith = Metalsmith('test/fixtures/pdf');
    metalsmith
      .use(brotli({
          brotli: {
              quality: 11
          }
        }))
      .build(function(err, files) {
          t.equal(files['index.html.br'].contents.length, 48, 'Compressed size is correct');
          t.error(err, 'No build errors');
      });
});

test('Brotli quality option can be set to 5', function(t) {
    t.plan(2);
    var metalsmith = Metalsmith('test/fixtures/pdf');
    metalsmith
      .use(brotli({
          brotli: {
              quality: 5
          }
        }))
      .build(function(err, files) {
          t.equal(files['index.html.br'].contents.length, 59, 'Compressed size is correct');
          t.error(err, 'No build errors');
      });
});
