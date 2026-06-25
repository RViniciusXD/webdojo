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
import { dateFormatter } from './utils'
import 'cypress-real-events'
import './actions/consultancy.actions'
import './actions/github.actions'

Cypress.Commands.add('start', () => {
    cy.visit('/')
})

Cypress.Commands.add('goToSingUp', () => {
    cy.start()
    cy.get('a[href="/register"]').click()
    cy.contains('h2', 'Crie sua conta')
        .should('be.visible')
})

Cypress.Commands.add('submitSingUpForm', (name, email, password) => {
    cy.contains('label', 'Nome')
        .parent()
        .find('input')
        .type(name)
    cy.contains('label', 'E-mail')
        .parent()
        .find('input')
        .type(email)
    cy.contains('label', 'Senha')
        .parent()
        .find('input')
        .type(password)
        
    cy.contains('button', 'Criar conta').click()
})

Cypress.Commands.add('submitLoginForm', (email, password) => {
    cy.start()
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
    cy.contains('button', buttonName)
        .should('be.visible')
        .click()
    cy.contains('h1', pageTitle)
        .should('be.visible')
})

// Helpers
Cypress.Commands.add('login', (ui = false) => {

    if (ui === true) {
        cy.start()
        cy.env(['oneUsername', 'onePassword']).then(({ username, password }) => {
            cy.submitLoginForm(username, password)
        })
    } else {
        const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
        const loginDate = dateFormatter(new Date())

        cy.setCookie('login_date', loginDate)
        cy.visit('/dashboard', {
            onBeforeLoad(win) {
                win.localStorage.setItem('token', token)
            }
        })
    }
})
