const fs = require('fs');
const mustache = require('mustache');

// Read translations from the JSON file
const translations = require('./translations.json');

// Read the template HTML file
const template = fs.readFileSync('./pages/landing/template/index.html', 'utf-8');

// Create output directories if they don't exist
const outputDirEn = './pages/landing/en';
const outputDirEs = './pages/landing/es';
fs.mkdirSync(outputDirEn, { recursive: true });
fs.mkdirSync(outputDirEs, { recursive: true });

// Generate HTML files for each language
for (const language in translations) {
  if (translations.hasOwnProperty(language)) {
    const translatedData = translations[language];
    const outputDir = language === 'en' ? outputDirEn : outputDirEs;
    const outputFile = `${outputDir}/index.html`;

    // Use Mustache to render the template with translations
    const renderedHTML = mustache.render(template, translatedData);

    // Write the rendered HTML to the output file
    fs.writeFileSync(outputFile, renderedHTML, 'utf-8');
    console.log(`Generated ${language} HTML file: ${outputFile}`);
  }
}
