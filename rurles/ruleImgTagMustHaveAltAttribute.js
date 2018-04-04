// Detect if any <img /> tag without alt attribute
const vsprintf = require('sprintf-js').vsprintf;

module.exports = function (dom) {
  let counter = 0;

  dom.window.document.querySelectorAll("img").forEach(function (element) {
    if (element.attributes.getNamedItem('alt') === null) {
      counter++;
    }
  });

  return {
    hasError: () => counter > 0,
    output: vsprintf(`There are %s <img> tag without alt attribute`, [counter])
  };
};
