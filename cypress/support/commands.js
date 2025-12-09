// Tambahkan custom command ini di cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:5173/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('eq', 'http://localhost:5173/');
});