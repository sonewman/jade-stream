// var fileName = './views/index.jade';

var fs = require('fs')
  , stream = require('stream')
  , StringDecoder = require('string_decoder').StringDecoder
  , decoder = new StringDecoder('utf8')
  , out = process.stdout;

var jade = require('jade');

var bench = require('./bench');

bench('full streaming', function (done) {
  var compiler = new stream.PassThrough();
  compiler._transform = function (chunk, enc, cb) {
    cb(null, jade.render(decoder.write(chunk), {filename: fileName}));
  };
  compiler.on('end', function () {
    done();
  });
  fs.createReadStream(fileName).pipe(compiler).pipe(out);
});

bench('sync render then stream', function (done) {
  var compiler = new stream.PassThrough();
  compiler.on('end', function () {
    done();
  });
  compiler.end(jade.renderFile(fileName));
  compiler.pipe(out);
});

bench('sync read, jade render then stream', function (done) {
  var compiler = new stream.PassThrough();
  compiler.on('end', function () {
    done();
  });
  compiler.end(jade.render(fs.readFileSync(fileName), {filename: fileName}));
  compiler.pipe(out);
});

bench('sync read and jade render', function (done) {
  console.log(jade.render(fs.readFileSync(fileName), {filename: fileName}));
  done();
});

bench('completely sync in jade', function (done) {
  console.log(jade.renderFile(fileName));
  done();
});