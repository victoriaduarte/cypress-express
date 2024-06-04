/// <reference types="cypress" />

describe('tasks', () => {

    context('create', () => {
        it('should create a new task', () => {

            const taskName = 'Read a node.js book'
    
            cy.removeTaskByName(taskName)
    
            cy.createTask(taskName)
    
            cy.contains('main div p', taskName)
                .should('be.visible')
        });
    
        it('should not create duplicate task', () => {
    
            const task = {
                name: 'Study Javascript',
                is_done: false
            }
    
            cy.removeTaskByName(task.name)
            cy.postTask(task)
    
            cy.createTask(task.name)
    
            cy.contains('.swal2-html-container', 'Task already exists!')
                .should('be.visible')
        });
    
        it('required field', () => {
    
            cy.createTask()
    
            cy.isRequired('This is a required field')
        });
    })

})