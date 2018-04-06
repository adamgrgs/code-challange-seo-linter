const fs = require('fs'),
  basename = require('basename'),
  {JSDOM} = require("jsdom"),
  EOL = require('os').EOL;

// construct
function SeoLinter(config) {
  this.config = config;
}

SeoLinter.prototype.exec = function (readStream = null) {
  this.readStream = readStream;
  const self = this;

  fs.readdir(self.config.rulesFolder, function (err, ruleList) {
    throwIfErr(err);

    run(
      ruleList.filter((filename) => {
        if (filename.match(self.config.filenamePattern) === null) {
          return false;
        }

        if (self.config.runStartsWithOnly.length <= 0) {
          return true;
        }

        return self.config.runStartsWithOnly.find((prefix) => filename.startsWith(prefix));
      })
      .map((filename) => {
        return require(self.config.rulesFolder + '/' + basename(filename));
      })
    );
  });

  function throwIfErr (err) {
    if (err)
      throw err;
  }

  function run(rules) {
    // read stream
    if (self.readStream !== null) {
      let dom = new JSDOM(self.readStream.read().toString());
      lint(rules, dom);

      return;
    }

    // read file
    JSDOM.fromFile(self.config.inputTarget).then(function(dom) {
      lint(rules, dom);
    });
  }

  function lint (rules, dom) {
    rules.forEach((fn) => {
      const result = fn(dom);

      if (!result.hasError()) {
        return;
      }

      // output to file
      if (self.config.outputTarget !== '') {
        fs.appendFile(self.config.outputTarget, result.output + EOL, function (err) {
          throwIfErr(err);
        });

        return;
      }

      // output to console
      console.log(result.output);
    });
  }
};

module.exports = SeoLinter;
