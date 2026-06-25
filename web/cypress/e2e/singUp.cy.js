import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Cadastro', () => {
    beforeEach(() => {
        cy.goToSingUp()
        cy.intercept('POST', 'http://localhost:3333/api/users/register', {
            statusCode: 201,
            body: {
                message: 'Usuario cadastrado com sucesso'
            }
        }).as('postSingUp')

    })
    _.times(5, () => {
        it('Cadastrando uma nova conta', () => {
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'

            cy.submitSingUpForm(name, email, password)

            cy.wait('@postSingUp')

            cy.contains('li', 'Conta criada com sucesso!')
                .should('be.visible')
        })
    })
})