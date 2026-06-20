import gitHubData from '../fixtures/github.json'

const { Users } = gitHubData

describe('Gerenciamento de Perfis no GitHub', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve criar um novo perfil no GitHub', () => {
        Users.forEach((user) => {
            cy.FillUserForm(user)
            cy.SubmitUserForm()
        })

        Users.forEach((user) => {
            cy.ValidateUserInTable(user)
        })
    })

    it('Deve poder remover um perfil', () => {
        Users.forEach((user) => {
            cy.FillUserForm(user)
            cy.SubmitUserForm()
        })
        cy.RemoveUserList(Users[0])
        cy.ValidateRemovedUserList(Users[0])
        Users.slice(1, 2).forEach((user) => {
            cy.ValidateUserInTable(user)
        })
    })

    it('Deve validar o link do perfil', () => {
        Users.forEach((user) => {
            cy.FillUserForm(user)
            cy.SubmitUserForm()
            cy.ValidateLinkGitHubUser(user)
        })
    })
})