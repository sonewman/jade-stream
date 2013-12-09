var test = require('tap').test
  , fs = require('fs')
  , jadeStream = require('../');

test('jadeStream() should return stream', function (t) {
  var js = jadeStream();
  js.on('readable', function () {
    var html = js.read();
    if (!html) return;
    t.equal(html.toString('utf8'), '<!DOCTYPE html><html><body><h1></h1></body></html>');
    t.end();
  });

  fs.createReadStream('./index.jade').pipe(js);
});

test('#createReadStream() should return readable stream', function (t) {
  var readable = jadeStream.createReadStream('./index.jade');
  readable.on('readable', function () {
    t.equal(readable.read().toString('utf8'), '<!DOCTYPE html><html><body><h1></h1></body></html>');
    t.end();
  });
});