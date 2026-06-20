import { dateFormatter } from '../support/utils'
const currentDate = new Date()

describe('Login', () => {

  beforeEach(() => {
    cy.viewport('iphone-xr')
  })

  it('Deve logar com sucesso', () => {
    cy.start()
    cy.env(['username', 'password']).then(({ username, password }) => {
      cy.submitLoginForm(username, password)
    })

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.getCookie('login_date').should('exist')

    cy.getCookie('login_date').then((cookie) => {
      expect(cookie.value).to.eq(dateFormatter(currentDate))
    })

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[a-f0-9]{32}$/)
    })
  })

  it('Não deve logar com senha inválida', () => {
    cy.start()
    cy.env(['username']).then(({ username }) => {
      cy.submitLoginForm(username, 'invalid-password')
    })

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email inválido', () => {
    cy.start()
    cy.env(['password']).then(({ password }) => {
      cy.submitLoginForm('invalid-email@webdojo.com', password)
    })

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})          