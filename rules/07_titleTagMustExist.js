// Detect if header doesn't have <title> tag
module.exports = function (dom) {
  let result = true;
  const title = dom.window.document.head.querySelector("title");

  if (title === null || title.innerHTML === '') {
    result = false;
  }

  return {
    hasError: () => !result,
    output: `This HTML without <title> tag`
  };
};
