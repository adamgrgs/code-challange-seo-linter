const fs = require('fs');
const basename = require('basename');
const {JSDOM} = require("jsdom");

fs.readFile('config.json', (err, data) => {
  scanFolder(JSON.parse(filterError(err, data)));
});

const filterError = function(err, data) {
  if (err) {
    throw err;
  }

  return data;
};

const scanFolder = function(config) {
  fs.readdir(config.rulesFolder, loadAllRules(config));
};

const loadAllRules = function (config) {
  return function (err, ruleList) {
    run(
      filterError(err, ruleList).filter((filename) =>
        filename.startsWith(config.rulesPrefix) && filename.endsWith(config.rulesSuffix)
      )
      .map((filename) => {
        return require(config.rulesFolder + '/' + basename(filename));
      })
    );
  };
};

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
