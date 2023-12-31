const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const crc32 = require("crc-32").str;

const getStringsFromHtmlFiles = (input_file) => {
  const dom = new JSDOM(input_file);

  // assign the variable name to following
  const document = dom.window.document;

  const messages = [];
  const el_translations = document.getElementsByClassName(
    "el__t_string__el"
  );

  Array.from(el_translations).forEach((el_translation) => {
    const translation_str = el_translation.innerHTML
      ? el_translation.innerHTML.trim()
      : "";

    if (translation_str) messages.push(translation_str);
  });

  return messages;
};

const insertStringsToHtmlFile = (
  input_file,
  translation_object,
  lang,
  favicon,
  thirdparty_scripts,
  page_scripts
) => {
  const dom = new JSDOM(input_file);

  const document = dom.window.document;

  const el_translations = document.getElementsByClassName(
    "el__t_string__el"
  );

  // if favicon is true, add a link tag with favicon href
  if (favicon) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = "../assets/favicon.png";
    document.head.appendChild(link);
  }

  if (page_scripts) {
    page_scripts.map((script) => {
      const script_tag = document.createElement("script");
      script_tag.innerHTML = script;
      document.body.appendChild(script_tag);
    });
  }

  if (thirdparty_scripts) {
    thirdparty_scripts.map((script) => {
      const script_tag = document.createElement("script");
      script_tag.src = script;
      document.body.appendChild(script_tag);
    });
  }

  // set html lang attribute to the language provided
  document.documentElement.setAttribute("lang", lang);

  Array.from(el_translations).forEach((el_translation) => {
    const translation_str = el_translation.innerHTML
      ? el_translation.innerHTML.trim()
      : "";

    if (translation_str) {
      const translationHash = crc32(translation_str);

      if (translation_object[translationHash]) {
        el_translation.innerHTML = translation_object[translationHash];
      }
    }

    el_translation.classList.remove("el__t_string__el");

    // remove the class attribute if the value is empty string
    if (!el_translation.getAttribute("class")) {
      el_translation.removeAttribute("class");
    }
  });

  return dom.serialize();
};

module.exports = {
  getStringsFromHtmlFiles,
  insertStringsToHtmlFile,
};
