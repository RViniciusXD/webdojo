import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Expert', () => {
    beforeEach(() => {
        cy.start()
    })

    it('Deve manipular os trinutos de elementos', () => {
        cy.get('#email').invoke('val', 'papito@teste.com.br')

        cy.get('#password').invoke('attr', 'type', 'text')
            .type('Senha123')

        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')
    })

    it('Não deve logar com senha inválida', () => {
        cy.start()
        cy.env(['oneUsername']).then(({ oneUsername }) => {
            cy.get('#email').type(oneUsername)
            cy.get('#password').type('asddasdasda{Enter}')
        })

        // cy.wait(2500)

        // cy.document().then((doc) => {
        //     cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML)
        // })
        cy.get('[data-sonner-toaster=true')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('div[class=title]')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.get('@toast', { timeout: 5000 })
            .should('not.exist')
    })

    it('Simulando a teclado tab com cy.press', () => {
        cy.get('body').press('Tab')
        cy.focused().should('have.attr', 'id', 'email')

        cy.get('#email').press('Tab')
        cy.focused().should('have.attr', 'id', 'password')
    })

    it.only('Deve realizar uma carga de dados fake', () => {
        _.times(5, () => {
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'
        })
    })
})