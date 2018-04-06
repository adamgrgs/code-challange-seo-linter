## This is a practicing npm package. Please do not use this package in production.

### Installation

`npm i --save code-challenge-seo-linter`

### Usage

```javascript
const SeoLinter = require('../index.js');

const seoLinterInstance = new SeoLinter({
  "customizeRulesFolder": [__dirname + "/helps"],
  "runStartsWithOnly": [],
  "inputTarget": "test/index.html",
  "outputTarget": ""
});

seoLinterInstance.exec();
```

### Description
- You can test your HTML with the `inputTarget` parameter,  or pass a readable stream to `exec()`  method.

  ```javascript
  // ...
  const Readable = require('stream').Readable;
  const rs = new Readable;
  rs.push('<!DOCTYPE html>');
  rs.push('</html>');
  rs.push(null);

  seoLinterInstance.exec(rs);
  ```

  ​

- Put your customize seo rules in the `customizeRulesFolder`, and start with '08' (01~07 are used for basic rules). And filename should follow '08_{description}.js' this pattern.
  Your customize javascript rules should follow the response format :

  ```javascript
  module.exports = function (dom) {
    return {
      hasError: () => true,
      output: `you got error`
    };
  };
  ```

- If you don't  want to run all the rules, put the rule sequence into the `runStartsWithOnly` array. For example : `"runStartsWithOnly": ["01", "08", "03"]`.

- Keep `outputTarget` empty and get the response thru console, or  give it a writeable file path.
