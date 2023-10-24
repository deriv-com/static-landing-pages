# Deriv Static Landing Pages

## Get Started

### Install

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

For every element which has some text that needs to be translated, we need to add a class `element__translation_string__element` to the element. For example:

```html
<p class="element__translation_string__element">This is some text</p>
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

```

## Workflow

<img width="443" alt="image" src="https://github.com/amir-deriv/deriv-static-landing-pages/assets/129206554/65f90c8c-24ba-40d4-b72b-4ac0f981fdb1">
