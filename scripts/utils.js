const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const crc32 = require("crc-32").str;

/**
 * This function extracts all the strings from the HTML file
 * @param {*} input_file - HTML file as string
 * @returns {Array} - Array of strings
 */
const getStringsFromHtmlFiles = (input_file) => {
  const dom = new JSDOM(input_file);

  // assign the variable name to following
  const document = dom.window.document;

  const messages = [];
  const el_translations = document.getElementsByClassName("el__t_string__el");

  Array.from(el_translations).forEach((el_translation) => {
    const translation_str = el_translation.innerHTML
      ? el_translation.innerHTML.trim()
      : "";

    if (translation_str) messages.push(translation_str);
  });

  return messages;
};

/**
 * This function inserts the strings into the HTML file and returns the HTML file as string with the translated strings inserted into it
 * @param {*} input_file - HTML file as string
 * @param {*} translation_object - Object with key as crc32 hash of the string and value as translated string
 * @param {*} lang - Language of the HTML file
 * @param {*} favicon - Boolean to check if the HTML file needs favicon
 * @param {*} thirdparty_scripts - Array of third party scripts
 * @param {*} page_scripts - Array of page scripts written in JS that needs to be minified and added to the HTML file
 * @returns {string} - HTML file as string with translated strings inserted into it
 */
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

  const el_translations = document.getElementsByClassName("el__t_string__el");

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

/**
 * @typedef {Object} PageContent
 * @property {string} html - HTML page as string
 */

/**
 * @typedef {Object} PageUtils
 * @property {PageContent} page - HTML page object
 * @property {Function} addLink - Adds a link to the page
 * @property {Function} addHeading - Adds a heading to the page
 */

/**
 * Generates an index page with links to all pages
 * @returns {PageUtils}
 */
const generateIndexPage = () => {
  const content = {
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Deriv | Static landing pages index</title>
        <meta name="description" content="Index page for all static pages exists">
        <style>
            body {
                margin: 1rem;
                display: flex;
                flex-direction: column;
            }

            a {
                margin: 0.5rem 0;
                font-size: 1rem;
            }
        </style>
    </head>
    <body>
    <h1>Index of pages</h1>
    </body>
    </html>
    `,
  };

  const addLink = (pagePath) => {
    const dom = new JSDOM(content.html);
    const document = dom.window.document;
    const link = document.createElement("a");
    link.href = pagePath;
    link.style = "max-width: fit-content;";
    link.innerHTML = pagePath;
    document.body.appendChild(link);

    content.html = dom.serialize();
  };

  const addHeading = (pageName) => {
    const dom = new JSDOM(content.html);
    const document = dom.window.document;
    const heading = document.createElement("h2");
    heading.innerHTML = pageName;
    document.body.appendChild(heading);

    content.html = dom.serialize();
  };

  return { page: content, addLink, addHeading };
};

module.exports = {
  getStringsFromHtmlFiles,
  insertStringsToHtmlFile,
  generateIndexPage,
};
