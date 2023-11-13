#!/usr/bin/env node

/* eslint-disable no-console */
const path = require("path");
const program = require("commander");
const crc32 = require("crc-32").str;
const fs = require("fs");
const { getStringsFromHtmlFiles } = require("./utils");

program
  .version("0.1.0")
  .description("Build translation source.")
  .option("-v, --verbose", "Displays the list of paths to be compiled")
  .parse(process.argv);

/** *********************************************
 * Common
 */
const getKeyHash = (string) => crc32(string);

/** **********************************************
 * Compile
 */
(async () => {
  try {
    const messages = [];
    const messages_json = {};

    const pagesDir = fs.readdirSync(path.resolve(__dirname, "../templates"));

    pagesDir.forEach((page) => {
      try {
        const template = fs.readFileSync(
          path.resolve(__dirname, `../templates/${page}/index.html`),
          "utf-8"
        );

        if (program.verbose) {
          console.log(template);
        }

        messages.push(...getStringsFromHtmlFiles(template));
      } catch (e) {
        console.log(e);
      }
    });

    // Hash the messages and set the key-value pair for json
    for (let i = 0; i < messages.length; i++) {
      messages_json[getKeyHash(messages[i])] = messages[i];
    }

    // Add to messages.json
    fs.writeFileSync(
      path.resolve(__dirname, "../crowdin/messages.json"),
      JSON.stringify(messages_json),
      "utf8",
      (err) => console.log(err)
    );
  } catch (e) {
    console.error(e);
  }
})();
