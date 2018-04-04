// Detect if any <img /> tag without alt attribute
const vsprintf = require('sprintf-js').vsprintf;

module.exports = function (dom) {
  // todo move maxStrongTags to config
  let maxStrongTags = 15;
  let countStrongTags = dom.window.document.querySelectorAll("strong").length;
  let result = false;

  if (countStrongTags >= maxStrongTags) {
    result = true;
  }

  return {
    hasError: () => result,
    output: vsprintf(`There are %s <strong> tags, the max should be %s`, [countStrongTags, maxStrongTags])
  };
};
