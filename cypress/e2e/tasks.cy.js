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

    context('update', () => {
        it('should complete a task', () => {

            const task = {
                name: 'Practice cypress',
                is_done: false
            }
    
            cy.removeTaskByName(task.name)
            cy.postTask(task)
    
            cy.visit('http://localhost:3000')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css','text-decoration-line','line-through')
        });
    })

    context('delete', () => {
        it('should delete a task', () => {

            const task = {
                name: 'Review project',
                is_done: false
            }
    
            cy.removeTaskByName(task.name)
            cy.postTask(task)
    
            cy.visit('http://localhost:3000')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        });
    })
})