const SeoLinter = require('../index.js');
const seoLinterInstance = new SeoLinter({
  "customizeRulesFolder": [__dirname + "/helps"],
  "runStartsWithOnly": [],
  "inputTarget": "test/index.html",
  "outputTarget": ""
});
seoLinterInstance.exec();

const Readable = require('stream').Readable;
const rs = new Readable;
rs.push('<!DOCTYPE html>');
rs.push('</html>');
rs.push(null);

seoLinterInstance.exec(rs);
