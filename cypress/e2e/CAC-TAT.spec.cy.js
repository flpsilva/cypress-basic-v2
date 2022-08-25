/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(()=>{
    cy.visit('./src/index.html')
  })
  //how to do login using private data:
  //Ex:
  //  cy.get('#userName').type(Cypress.env('user_name'), { log: false })
  //    .get('#password').type(Cypress.env('user_password'), { log: false })

//#region Tests
  it('Verify the application title', () => {
     cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  });

  it('Fill in the required fields and send the form', () => {
    const longText = 'test, test, test, test, test, test, test, test, test, test, test, test, test, test' 
    //variable ^
    cy.get('#firstName').type('felipe')
        .get('#lastName').type('almeida')
        .get('#email').type('test@gmail.com')
        .get('#open-text-area').type(longText, {delay: 0 })
        //define the delay as "0" help to write long texts in less time as possible 
        //(type delay has 10 seconds as default)
        .get('button[type="submit"]').click()
        .get('.success').should('be.visible')
  });

  it('Display an error message when trying to submit the form using a invalid formatting email', () => {
    cy.get('#firstName').type(Cypress.env('user_name'))
        .get('#lastName').type(Cypress.env('user_password'))
        .get('#email').type('test@test')
        .get('#open-text-area').type('test')
        .get('button[type="submit"]').click()
        .get('[class="error"]').should('be.visible')
  });

  it('The phone field remains empty when filled with non-numeric value', () => {
    cy.get('#phone')
      .type('asdfgqwer')
      .should('have.value','')
  });

  it('Displays error message when phone number becomes required but not filled in before form submission', () => {
    cy.get('#firstName').type('felipe')
      .get('#lastName').type('almeida')
      .get('#email').type('test@test.com')
      .get('#open-text-area').type('test')
      .get('#phone-checkbox').check()
      .get('button[type="submit"]').click()
      .get('.error').should('be.visible')
  });

  it('Fill and clear the input field: name, last name, email, text area, and phone number', () => {
    cy.get('#firstName').type('felipe')
      .should('have.value','felipe')
      .clear()
      .should('have.value','')
      .get('#lastName').type('almeida')
      .should('have.value','almeida')
      .clear()
      .should('have.value','')
      .get('#email').type('test@test.com')
      .should('have.value','test@test.com')
      .clear()
      .should('have.value','')
      .get('#open-text-area').type('test')
      .should('have.value','test')
      .clear()
      .should('have.value','')
      .get('#phone').type('123456789')
      .should('have.value','123456789')
      .clear()
      .should('have.value','')
      
  });

  it('Displays an error message when submitting the form without filling the required fields', () => {
    cy.get('button[type="submit"]').click()
      .get('[class="error"]').should('be.visible')

  });

  it('submit form successfully using a custom command', () => {
    cy.fillMandatoryfieldsAndSubmit()
      .get('.success').should('be.visible')
  });

  it('Select a product (YouTube) by its text', () => {
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')
  });

  it('Selects a product (Mentorship) by its value (value)', () => {
    cy.get('#product').select('mentoria')
      .should('have.value','mentoria')
  });

  it('Select a product (Blog) by its index', () => {
    cy.get('#product').select(1)
      .should('have.value','blog')
  });

  it('Check the "Feedback" service type', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
    cy.should('be.checked')
  });

  it('Check each type of service', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
       cy.wrap($radio).check()
       cy.wrap($radio).should('be.checked')
      })
  });

  it('Check all checkboxes and uncheck only one.', () => {
    cy.get('input[type="checkbox"]')
      .check().should('be.checked')
      .last()
      .uncheck().should('not.be.checked')
  });

  it('Select one file from the fixture folder', () => {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        //using the jquery command to log on cypress page console to check the file name:
        //console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })

  })

  it('Select a file simulating a drag and drop', () => {
    cy.get('#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Select a file using a fixture an alias', () => {
    cy.fixture('example.json').as('sample.File')
    cy.get('#file-upload')
    //type '@....' to use a alias 
    .selectFile('@sample.File')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Verifies that the privacy policy opens in another tab without the need for a click', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('Access the privacy policy page by removing the target and then clicking on the link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  });

  it('Access the privacy policy page by src (extra exercise)', () => {
    cy.visit('./src/privacy.html')
      .contains('Talking About Testing')
  });
  //#endregion
})