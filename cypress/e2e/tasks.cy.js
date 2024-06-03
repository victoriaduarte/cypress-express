/// <reference types="cypress" />

describe('tasks', () => {
    it('should create a new task', () => {

        const taskName = 'Read a node.js book'

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: taskName }
        }).then(response => {
            expect(response.status).to.eq(204)
        })

        cy.visit('http://localhost:3000')

        cy.get('input[placeholder="Add a new Task"]')
            .type(taskName)

        cy.contains('button', 'Create').click()

        cy.contains('main div p', taskName)
            .should('be.visible')
    });

    it('should not create duplicate task', () => {

        const task = {
            name: 'Study Javascript',
            is_done: false
        }

        // Delete task
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: task.name }
        }).then(response => {
            expect(response.status).to.eq(204)
        })

        // Create task
        cy.request({
            url: 'http://localhost:3333/tasks',
            method: 'POST',
            body: task
        }).then(response => {
            expect(response.status).to.eq(201)
        })

        cy.visit('http://localhost:3000')

        cy.get('input[placeholder="Add a new Task"]')
            .type(task.name)

        cy.contains('button', 'Create').click()

        cy.contains('.swal2-html-container', 'Task already exists!')
            .should('be.visible')
    });
})