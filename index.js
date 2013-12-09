module.exports = JadeStream;

var fs = require('fs')
  , PassThrough = require('stream').PassThrough
  , inherits = require('util').inherits
  , StringDecoder = require('string_decoder').StringDecoder
  , decoder = new StringDecoder('utf8')

  , jade = require('jade');


function JadeStream (options) {
  if (!(this instanceof JadeStream)) return new JadeStream(options);
  PassThrough.call(this, options);
  this._options = options;
}

inherits(JadeStream, PassThrough);

JadeStream.prototype._transform = function (chunk, enc, cb) {
  cb(null, jade.render(decoder.write(chunk), this._options));
};

JadeStream.createReadStream = function (fileName, options) {
  var jadeStream = new JadeStream();
  jadeStream.end(jade.renderFile(fileName, options));
  jadeStream._options = options;
  return jadeStream;
};