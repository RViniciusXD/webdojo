import { dcCharacters } from '../fixtures/dc-characters'

describe('GET /api/users', () => {

    beforeEach(() => {
        dcCharacters.forEach((characters) => {
            cy.postUser(characters)
        })
    })

    it('Deve retornar uma lista de usuários', () => {
        cy.getUsers().then((res) => {
            expect(res.status).to.eq(200)

            dcCharacters.forEach((characters) => {
              const found = res.body.find((user) => user.email === characters.email)
              expect(found.name).to.eq(characters.name)
              expect(found.email).to.eq(characters.email)
              expect(found).to.have.property('id')
            })
        })
    })
})