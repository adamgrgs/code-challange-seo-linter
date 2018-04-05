// Detect if any <a /> tag without rel attribute
const vsprintf = require('sprintf-js').vsprintf;

module.exports = function (dom) {
  let counter = 0;

  dom.window.document.querySelectorAll("a").forEach(function (element) {
    if (element.attributes.getNamedItem('rel') === null) {
      counter++;
    }
  });

  return {
    hasError: () => counter > 0,
    output: vsprintf(`There are %s <a> tag without rel attribute`, [counter])
  };
};
