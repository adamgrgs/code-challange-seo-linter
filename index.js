module.exports.exec = function(readStream = null) {
  const fs = require('fs'),
    config = require('config'),
    basename = require('basename'),
    {JSDOM} = require("jsdom");

  fs.readdir(config.rulesFolder, function (err, ruleList) {
    if (err) {
      throw err;
    }

    run(
      ruleList.filter((filename) => {
        if (filename.match(config.filenamePattern) === null) {
          return false;
        }

        if (config.runStartsWithOnly.length <= 0) {
          return true;
        }

        return config.runStartsWithOnly.find((prefix) => filename.startsWith(prefix));
      })
        .map((filename) => {
          return require(config.rulesFolder + '/' + basename(filename));
        })
    );
  });

  const run = function (rules) {
    // read stream
    if (readStream !== null) {
      let dom = new JSDOM(readStream.read().toString());
      lint(rules, dom);

      return;
    }

    // read file
    JSDOM.fromFile(config.inputTarget).then(function(dom) {
      lint(rules, dom);
    });
  };

  const lint = function (rules, dom) {
    rules.forEach((fn) => {
      const result = fn(dom);

      if (result.hasError()) {
        console.log(result.output);
      }
    });
  };
};
