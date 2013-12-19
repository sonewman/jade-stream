# Simple to user Jade Stream

Install:
`
$ npm install jade-stream
`

It is possible to pipe a readable stream to it:
```js
var jadeStream = require('jade-stream')
  , fs = require('fs');

var options = { my: 'jade options', or: 'locals' };

fs.createReadStream('./index.jade')
  .pipe(jadeStream(options))
  .pipe(process.stdout);
```

A readable stream can also be created:
```js
var jadeStream = require('jade-stream')
  , fs = require('fs');

var options = { my: 'jade options', or: 'locals' };

jadeStream.createReadStream('./index.jade', options)
  .pipe(process.stdout);
```

At the moment the createReadStream actually reads the file synchronously because when testing it was ~15ms faster to read the file sync than to create a readable stream.

It is likely in the future a flag could be added to the options which would force this to be completely streaming.
