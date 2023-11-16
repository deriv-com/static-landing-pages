# Deriv Static Landing Pages

The goal of this project is to have a simplest solution for creating static landing pages and have user tracking, translations and A/B testing capabilities up and running in no time.

This also ease the process of creating new landing pages and make it more accessible to non-technical people, they can easily edit the content of page or create new pages by just adding a new folder in the `templates` folder and adding the required files.

## Get Started

### Install Dependencies

```bash
npm install
```

### Scripts

Generate all pages:

```bash
npm run generate-pages
```

Extract all translation strings from the templates:

```bash
npm run extract-translations
```

## Development

### Template structure

For each page we want to add in the project, we need to create a folder in `templates` folder with the name of the page. For example, if we want to create a page with the name `about`, we need to create a folder with the name `about` in the `templates` folder.

The folder should contain the following files:

- `index.html`: The main html file for the page
- `page.config.js`: The configuration file for the page
- `scripts/main.js`: The main script file for the project, we can add as many scripts as we want in this file and all of them will be included in the final bundle
- `assets/favicon.ico`: The favicon for the page


#### Translations

Inside the html file of the template for every element which has some text that needs to be translated, we need to add a class `el__t_string__el` to the element. For example:

```html
<p class="el__t_string__el">This is some text</p>
```

### Page configuration

The page configuration is located in `templates/<<page>>/page.config.js`. For example, the configuration for the `about` page is located in `templates/about/page.config.js`.

The configuration file contains the following properties:

```js

module.exports = {
  translations: ["en", "fr", "es"], // List of languages to be translated
  favicon: true, // Whether to use the favicon from assets folder or not
  thirdparty_scripts: [
    "https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js",
    "https://cdn.jsdelivr.net/npm/@growthbook/growthbook/dist/bundles/index.js",
  ], // List of third party scripts to be included in the page
}

```

## Workflow

The following diagram shows the high level workflow of the project:

<img width="443" alt="image" src="https://github.com/amir-deriv/deriv-static-landing-pages/assets/129206554/65f90c8c-24ba-40d4-b72b-4ac0f981fdb1">
