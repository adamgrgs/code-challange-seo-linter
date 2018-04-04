// Detect if header doesn't have <meta name="descriptions"> tag
module.exports = function (dom) {
  let result = false;
  const BreakException = {};

  try {
    dom.window.document.querySelectorAll("meta").forEach((meta) => {
      if (meta.name === 'descriptions') {
        result = true;
        throw BreakException;
      }
    });
  }
  catch (e) {
    if (e !== BreakException) {
      throw e;
    }
  }

  return {
    hasError: () => !result,
    output: `This HTML without <meta name="descriptions"> tag`
  };
};
