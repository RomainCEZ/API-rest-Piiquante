/// <reference types="cypress" />

describe('Log in and create a new sauce', () => {
    before(() => {
        cy.visit('http://127.0.0.1:8080/')
    });
    beforeEach(() => {
    });
    afterEach(() => {
    });

    
    it('should log in', () => {
        cy.get('#email').type('123@123.fr');
        cy.get('#password').type('123');
        cy.get('.mat-raised-button').click();
    })
    it('should add a new sauce', () => {
        cy.get('body > app-root > app-header > nav > div.left-nav > ul > li:nth-child(2) > a').click();
        cy.get('#name').type('Hot chocolate');
        cy.get('#manufacturer').type('Me');
        cy.get('#description').type('Hot sauce and chocolate');
        cy.get('body > app-root > div > app-sauce-form > form > div:nth-child(4) > input').attachFile('Ginger.jpg');
        cy.get('#main-pepper').type('Chocolate');
        cy.get('input#heat').as('range').invoke('val', 5).trigger('change');
        cy.get('body > app-root > div > app-sauce-form > form > button > span').click();
    })
})
