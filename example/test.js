const SeoLinter = require('../index.js');
const seoLinterInstance = new SeoLinter({
  "customizeRulesFolder": [],
  "filenamePattern": "^\\d+_\\w+.js",
  "runStartsWithOnly": [],
  "inputTarget": "example/test/index.html",
  // "outputTarget": "example/test/output.txt"
  "outputTarget": ""
});
seoLinterInstance.exec();

// console.log(stream);
// const Readable = require('stream').Readable;
// const rs = new Readable;
// rs.push('<!DOCTYPE html>');
// rs.push('</html>');
// rs.push(null);
//
// seo.exec(rs);
