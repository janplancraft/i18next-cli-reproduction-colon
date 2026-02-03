const { defineConfig } = require('i18next-cli');

/** @type {import('i18next-cli').I18nextToolkitConfig} */
module.exports = defineConfig({
  locales: ["en", "nl", "es", "pl"],
  extract: {
    primaryLanguage: "en",
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "{{language}}/{{namespace}}.json"
  }
});