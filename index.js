const fs = require('fs'),
  config = require('config'),
  basename = require('basename'),
  {JSDOM} = require("jsdom");

fs.readdir(config.rulesFolder, function (err, ruleList) {
  if (err) {
    throw err;
  }

  run(
    ruleList.filter((filename) =>
      filename.startsWith(config.rulesPrefix) && filename.endsWith(config.rulesSuffix)
    )
    .map((filename) => {
      return require(config.rulesFolder + '/' + basename(filename));
    })
  );
});

const run = function (rules) {
  // todo free to chain any rules by user
  JSDOM.fromFile('test/index.html').then(function (dom) {
    rules.forEach((fn) => {
      const result = fn(dom);

      if (result.hasError()) {
        console.log(result.output);
      }
    });
  });
};
