const rules = [
  require('./rules/ruleImgTagMustHaveAltAttribute'),
  require('./rules/ruleHyperlinkTagMustHaveRelAttribute'),
  require('./rules/ruleTitleTagMustExist'),
  require('./rules/ruleMetaTagDescriptionMustExist'),
  require('./rules/ruleMetaTagKeywordsMustExist'),
];

const {JSDOM} = require("jsdom");

// todo move file path to config
// todo free to chain any rules by user
JSDOM.fromFile('test/index.html').then(function (dom) {
  rules.forEach((fn) => {
    const result = fn(dom);

    if (result.hasError()) {
      console.log(result.output);
    }
  });
});
