//#region examples
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//#endregion
Cypress.Commands.add('fillMandatoryfieldsAndSubmit', () =>{
    cy.get('#firstName').type('felipe')
    cy.get('#lastName').type('almeida')
    cy.get('#email').type('test@gmail.com')
    cy.get('#open-text-area').type('test')
    cy.contains('button', 'Enviar').click()     
})