import { dateFormatter } from '../support/utils'
const currentDate = new Date()

describe('Login', () => {

  it('Deve logar com sucesso', () => {
    cy.start()
    cy.env(['oneUsername', 'onePassword']).then(({ oneUsername, onePassword }) => {
      cy.submitLoginForm(oneUsername, onePassword)
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
    cy.env(['oneUsername']).then(({ oneUsername }) => {
      cy.submitLoginForm(oneUsername, 'invalid-password')
    })

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email inválido', () => {
    cy.start()
    cy.env(['onePassword']).then(({ onePassword }) => {
      cy.submitLoginForm('invalid-email@webdojo.com', onePassword)
    })

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})          