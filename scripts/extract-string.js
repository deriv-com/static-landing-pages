const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getStringsFromHtmlFiles = (input_file) => {
  const dom = new JSDOM(input_file);

  // assign the variable name to following
  const document = dom.window.document;

  const messages = [];
  const el_translations = document.getElementsByClassName(
    "element__translation_string__element"
  );

  Array.from(el_translations).forEach((el_translation) => {
    const translation_str = el_translation.innerHTML
      ? el_translation.innerHTML.trim()
      : "";

    if (translation_str) messages.push(translation_str);
  });

  return messages;
};

module.exports = {
  getStringsFromHtmlFiles,
};
