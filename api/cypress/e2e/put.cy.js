describe('PUT /api/users/:id', () => {
    context('Atualização', () => {
        let userId

        const originalUser = {
            name: 'Peter Parker',
            email: 'peter.parker@stark.com',
            password: 'Peter123'
        }

        const updatedUser = {
            name: 'Spider Man',
            email: 'spiderman@marvel.com',
            password: 'Spider123'
        }

        before(() => {
            cy.task('deleteUser', updatedUser.email)
            cy.task('deleteUser', originalUser.email)

            cy.postUser(originalUser).then((res) => {
                userId = res.body.user.id
            })
        })

        it('Deve atualizar um usuário existente', () => {
            cy.putUser(userId, updatedUser).then((res) => {
                expect(res.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then((res) => {
                const found = res.body.find((user) => user.email === updatedUser.email)

                expect(found.name).to.eq(updatedUser.name)
                expect(found.email).to.eq(updatedUser.email)
                expect(found).to.have.property('id')
            })
        })
    })

    context('Quando o ID não existe', () => {
        let userId

        const originalUser = {
            name: 'Peter Parker',
            email: 'peter.parker@stark.com',
            password: 'Peter123'
        }

        const updatedUser = {
            name: 'Spider Man',
            email: 'spiderman@marvel.com',
            password: 'Spider123'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)

            cy.postUser(originalUser).then((res) => {
                userId = res.body.user.id
            })

            cy.task('deleteUser', originalUser.email)
        })

        it('Deve retornar 404 e user not found', () => {
            cy.log()

            cy.putUser(userId, updatedUser).then((res) => {
                expect(res.status).to.eq(404)
                expect(res.body.error).to.eq('User not found')
            })
        })
    })

    context('Campos obrigatórios', () => {
        it('O campo name deve ser obrigatório', () => {
            const user = {
                email: 'moon.knigth@marvel.com.br',
                password: 'Senha123'
            }

            cy.putUser(1, user).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body.message).to.eq('Name is required!')
            })
        })

        it('O campo email deve ser obrigatório', () => {
            const user = {
                name: 'Moon Knigth',
                password: 'Senha123'
            }

            cy.putUser(1, user).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body.message).to.eq('E-mail is required!')
            })
        })

        it('O campo password deve ser obrigatório', () => {
            const user = {
                name: 'Moon Knigth',
                email: 'moon.knigth@marvel.com.br'
            }

            cy.putUser(1, user).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body.message).to.eq('Password is required!')
            })
        })

        it('Não deve passar quando o JSON está mal formatado', () => {
            const user = `{
                "name": "Moon Knigth",
                "email": "moon.knigth@marvel.com.br"
                "password": "Senha123"
            }`

            cy.putUser(1, user).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body.message).to.eq('Invalid JSON format.')
            })
        })
    })
})
