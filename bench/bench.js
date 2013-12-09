var res = []
  , count = 0;

module.exports = function (name, fn) {
  var out = process.stdout
    , start;

  count++;
  if ('function' === typeof name) fn = name;
  if ('string' !== typeof name) name = '';

  //  run cb
  start = +new Date();
  setTimeout(function () {
    fn(done);
  }, 0);
  
  function done () {
    res.push({ name: name, time: (((+new Date()) - start) / 1000)});
    count--;

    if (count > 0) return;
    out.write('\n\n');
    res.forEach(function (test) {
      out.write('\n' + test.name + ' ----- ' + test.time + 's');
    });
    out.write('\n');
    res = [];
  }
};


function orderOfTime (a) {
  var ret = [];
  a.forEach(function (i) {
    if (ret.length === 0) return ret.push(i);

    ret.forEach(function (b, j) {
      if (i.time < b.time) ret.splice(j, 0, i);
    });
  });
}