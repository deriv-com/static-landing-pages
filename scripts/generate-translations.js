const fs = require("fs");
const { insertStringsToHtmlFile } = require("./insert-string");

const pagesDir = fs.readdirSync("./pages");

pagesDir.forEach((page) => {
  const template = fs.readFileSync(
    `./pages/${page}/template/index.html`,
    "utf-8"
  );

  const pageConfig = require(`../pages/${page}/page.config.js`);

  const translations = pageConfig.translations;

  for (const language of translations) {
    const translationJson = require(`../translations/${language}.json`);

    const renderedHTML = insertStringsToHtmlFile(template, translationJson, language);

    const outputDir = `./pages/${page}/${language}`;

    fs.mkdirSync(outputDir, { recursive: true });

    const outputFile = `${outputDir}/index.html`;

    fs.writeFileSync(outputFile, renderedHTML, "utf-8");
    console.log(`Generated ${language} HTML file: ${outputFile}`);
  }
});
