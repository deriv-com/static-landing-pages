const path = require("path");
const fs = require("fs");
const { insertStringsToHtmlFile } = require("./insert-string");

fs.rmdirSync(
  "./pages",
  {
    recursive: true,
  },
  () => {
    console.log("Pages directory removed");
  }
);

fs.mkdirSync("./pages");

const templatesDir = fs.readdirSync(path.resolve(__dirname, "../templates"));

templatesDir.forEach((page) => {
  const template = fs.readFileSync(
    path.resolve(__dirname, `../templates/${page}/index.html`),
    "utf-8"
  );

  const pageConfig = require(`../templates/${page}/page.config.js`);

  const favicon = pageConfig.favicon;

  const thirdparty_scripts = pageConfig.thirdparty_scripts;

  const translations = pageConfig.translations;

  for (const language of translations) {
    const translationJson = require(`../translations/${language}.json`);

    let page_scripts = [];

    const scriptsDir = fs.readdirSync(
      path.resolve(__dirname, `../templates/${page}/scripts`)
    );

    scriptsDir.map((script) => {
      const script_content = fs.readFileSync(
        path.resolve(__dirname, `../templates/${page}/scripts/${script}`),
        "utf-8"
      );

      page_scripts.push(script_content);
    });

    const renderedHTML = insertStringsToHtmlFile(
      template,
      translationJson,
      language,
      favicon,
      thirdparty_scripts,
      page_scripts
    );

    const outputDir = `./pages/${page}/${language}`;

    fs.mkdirSync(outputDir, { recursive: true });

    const outputFile = `${outputDir}/index.html`;

    fs.writeFileSync(outputFile, renderedHTML, "utf-8");

    console.log(`Generated ${language} HTML file: ${outputFile}`);
  }

  if (favicon) {
    fs.mkdirSync(`./pages/${page}/assets`, { recursive: true });
    // copy favicon to pages directory inside asset folder
    fs.copyFileSync(
      path.resolve(__dirname, `../templates/${page}/assets/favicon.png`),
      path.resolve(__dirname, `../pages/${page}/assets/favicon.png`)
    );
  }
});
