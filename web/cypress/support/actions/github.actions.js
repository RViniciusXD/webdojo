Cypress.Commands.add('FillUserForm', (form) => {
    cy.contains('Label', 'Nome')
        .parent()
        .find('input')
        .type(form.name)

    cy.contains('Label', 'Username')
        .parent()
        .find('input')
        .type(form.username)

    cy.contains('Label', 'Perfil')
        .parent()
        .find('input')
        .type(form.perfil)
})

Cypress.Commands.add('SubmitUserForm', () => {
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('ValidateUserInTable', (data) => {
    cy.contains('table tbody tr', data.username)
        .should('be.visible')
        .as('trProfile')

    cy.get('@trProfile')
        .contains('td', data.name)
        .should('be.visible')

    cy.get('@trProfile')
        .contains('td', data.perfil)
        .should('be.visible')
})

Cypress.Commands.add('RemoveUserList', (data) => {
    cy.contains('table tbody tr', data.username)
        .should('be.visible')
        .as('trProfile')
    
    cy.get('@trProfile')
        .find('button[title="Remover perfil"]')
        .click()
})

Cypress.Commands.add('ValidateRemovedUserList', (data)=> {
    cy.contains('table tbody', data.username)
        .should('not.exist')
})

Cypress.Commands.add('ValidateLinkGitHubUser', (data) =>  {
    cy.contains('table tbody tr', data.username)
        .should('be.visible')
        .as('trProfile')
    
        cy.get('@trProfile')
            .find('a[title="Abrir perfil no GitHub"]')
            .should('have.attr', 'href', `https://github.com/${data.username}`)
            .and('have.attr', 'target', '_blank')
            
})