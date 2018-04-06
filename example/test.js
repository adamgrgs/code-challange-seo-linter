const SeoLinter = require('../index.js');
const seoLinterInstance = new SeoLinter({
  "customizeRulesFolder": [__dirname + "/helps"],
  "runStartsWithOnly": [],
  "inputTarget": "test/index.html",
  // "outputTarget": "test/output.txt"
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
// seoLinterInstance.exec();
