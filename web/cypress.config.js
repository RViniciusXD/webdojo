const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  env: {
    oneUsername: 'papito@webdojo.com',
    onePassword: 'katana123',
    twoName: 'Vinicius',
    twoUsername: 'testevinicius@teste.com.br',
    twoPassword: 'Senha@123'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: false
  },
});
