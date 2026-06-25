const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const { deleteUserByEmail } = require('./cypress/support/database')

      on('task', {
        deleteUser(email) {
          return deleteUserByEmail(email)
        }
      })
    },
    baseUrl: 'http://localhost:3333'
  },
});
