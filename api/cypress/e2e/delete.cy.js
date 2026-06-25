describe('DELETE /api/users/:id', () => {
    context('Remoção', () => {
        let userID

        const deletedUser = {
            name: 'Hulk',
            email: 'hulk@marvel.com',
            password: 'Senha123'
        }

        before(() => {
            cy.task('deleteUser', deletedUser.email)

            cy.postUser(deletedUser).then((res) => {
                userID = res.body.user.id
            })
        })

        it('Deve deletar o usuário com sucesso', () => {
            cy.deleteUser(userID).then((res) => {
                expect(res.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then((res) => {
                expect(res.body.find((user) => user.email === deletedUser.email)).to.eq(undefined)
            })
        })
    })

    context('Quando o ID não existe', () => {
        let userID

        const deletedUser = {
            name: 'Hulk',
            email: 'hulk@marvel.com',
            password: 'Senha123'
        }

        before(() => {
            cy.task('deleteUser', deletedUser.email)

            cy.postUser(deletedUser).then((res) => {
                userID = res.body.user.id
            })

            cy.task('deleteUser', deletedUser.email)
        })

        it('Deve retornar 404 e user not found', () => {
            cy.deleteUser(userID).then((res) => {
                expect(res.status).to.eq(404)
                expect(res.body.error).to.eq('User not found')
            })
        })
    })
})