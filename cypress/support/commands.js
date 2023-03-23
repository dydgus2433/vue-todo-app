// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (user) => {
  cy.request(
    "POST",
    Cypress.env("VUE_APP_API_HOST") + `/user/login/social`,
    user
  )
    .its("body")
    .then((body) => {
      cy.window().then((window) => {
        cy.setLocalStorage("user", JSON.stringify(body));
        // cy.checkUser(JSON.stringify(body));
      });
    });
});

Cypress.Commands.add("getTodos", (user) => {
  cy.window().its(`localStorage.todo-app`).should("eq", user);
});

Cypress.Commands.add("getLocalStorage", (key) => {
  cy.window().then((window) => window.localStorage.getItem(key));
});

Cypress.Commands.add("setLocalStorage", (key, value) => {
  cy.window().then((window) => {
    window.localStorage.setItem(key, value);
  });
});
