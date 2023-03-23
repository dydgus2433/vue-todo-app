const dotenv = require("dotenv");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  experimentalStudio: true,
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      const envName = config.env.mode;
      config.env = dotenv.config({ path: `.env.${envName}` }).parsed;

      console.log(config);
      config.baseUrl = config.env.BASE_URL;
      return config;
    },
  },
});
