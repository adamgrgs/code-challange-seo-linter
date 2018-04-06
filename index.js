const fs = require('fs'),
  basename = require('basename'),
  {JSDOM} = require("jsdom"),
  EOL = require('os').EOL;

// construct
function SeoLinter(config) {
  this.config = config;
}

SeoLinter.prototype.exec = function (readStream = null) {
  this.config.customizeRulesFolder.push(__dirname + '/rules');
  const self = this;

  this.config.customizeRulesFolder.forEach((currentFolder) => {
    fs.readdir(currentFolder, function (err, ruleList) {
      throwIfErr(err);

      run(
        ruleList.filter((filename) => {
          if (filename.match(/^\d+_\w+.js/) === null) {
            return false;
          }

          if (self.config.runStartsWithOnly.length <= 0) {
            return true;
          }

          return self.config.runStartsWithOnly.find((prefix) => filename.startsWith(prefix));
        })
        .map(loadModule(currentFolder))
      );
    });
  });

  function throwIfErr (err) {
    if (err)
      throw err;
  }

  function loadModule(currentFolder) {
    return function(filename) {
      return require(currentFolder + '/' + basename(filename));
    }
  }

  function run(rules) {
    // read stream
    if (readStream !== null) {
      readStream.on('readable', function () {
        const buffer = readStream.read();
        if (buffer) {
          const dom = new JSDOM(buffer.toString());
          lint(rules, dom);
        }
      });
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
