/**
 * This script will generate a new page in the pages folder
 * with the template and config file for the new page.
 */

const fs = require("fs");
const path = require("path");
const program = require("commander");

program
  .version("0.1.0")
  .description("Add a new page")
  .option("-v, --verbose", "Displays the list of paths to be compiled")
  .parse(process.argv);

const pageName = program.args[0];
const pageTitle = program.args[1];
const pageDescription = program.args[2];
const pageLanguages = program.args[3];

// Help command for the script to show the usage
if (program.args.length === 0) {
  console.log(
    "Usage: node add-new-page.js <page-name> <page-title> <page-description> <page-languages>",
  );
  process.exit(1);
}

/* =================== Validate the arguments ================= */

if (!pageName) {
  console.error("Please provide the page name.");
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(pageName)) {
  console.error("Please provide a valid page name.");
  process.exit(1);
}

if (fs.existsSync(path.resolve(__dirname, `../pages/${pageName}`))) {
  console.error("Page name is already taken.");
  process.exit(1);
}

if (!pageTitle) {
  console.error("Please provide the page title.");
  process.exit(1);
}

if (!pageDescription) {
  console.error("Please provide the page description.");
  process.exit(1);
}

if (!pageLanguages) {
  console.error("Please provide the page languages.");
  process.exit(1);
}

/************************************************************** */

// Check if the page languages are valid and supported by checking the translations directory if the language file .json exists
const pageLanguagesArray = pageLanguages.split(",");
const translationsDir = fs.readdirSync(
  path.resolve(__dirname, "../translations"),
);
const supportedLanguages = translationsDir.map((file) => file.split(".")[0]);

pageLanguagesArray.forEach((language) => {
  if (!supportedLanguages.includes(language)) {
    console.error(`Language ${language} is not supported.`);
    process.exit(1);
  }
});

// Create the page folder
fs.mkdirSync(path.resolve(__dirname, `../templates/${pageName}`));

// Create the page template file
fs.writeFileSync(
  path.resolve(__dirname, `../templates/${pageName}/index.html`),
  `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>${pageTitle}</title>
        <meta name="description" content="${pageDescription}" />
    </head>
    <body>
        <h1 class="el__t_string__el">${pageTitle}</h1>
        <p class="el__t_string__el">${pageDescription}</p>
    </body>
</html>`,
  "utf8",
  (err) => console.log(err),
);

// Create the page config file
fs.writeFileSync(
  path.resolve(__dirname, `../templates/${pageName}/page.config.js`),
  `module.exports = {
  title: "${pageTitle}",
  description: "${pageDescription}",
  translations: ["${pageLanguagesArray.join('", "')}"],
  analytics: false,
  ab_testing: false,
}`,
  "utf8",
  (err) => console.log(err),
);
