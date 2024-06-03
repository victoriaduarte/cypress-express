/// <reference types="cypress" />

describe('tasks', () => {
    it('should create a new task', () => {

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: 'Read a node.js book' }
        }).then(response => {
            expect(response.status).to.eq(204)
        })

        cy.visit('http://localhost:3000')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Read a node.js book')

        cy.contains('button', 'Create').click()

        cy.contains('main div p', 'Read a node.js book')
            .should('be.visible')
    });
})