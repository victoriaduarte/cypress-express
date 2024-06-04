/// <reference types="cypress" />

describe('home', () => {
    it('web app should be online', () => {
        cy.visit('/');

        cy.title().should('eq','Gerencie suas tarefas com Mark L')
    });
})