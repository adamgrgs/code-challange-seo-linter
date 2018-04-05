// Detect if any <img /> tag without alt attribute
const vsprintf = require('sprintf-js').vsprintf;

module.exports = function (dom) {
  let maxStrongTags = 1;
  let countStrongTags = dom.window.document.querySelectorAll("h1").length;
  let result = false;

  if (countStrongTags >= maxStrongTags) {
    result = true;
  }

  return {
    hasError: () => result,
    output: vsprintf(`There are %s <h1> tags, the max should be %s`, [countStrongTags, maxStrongTags])
  };
};
