describe('Testando Hover', ()=> {
    it('Deve exibir o hover ao passar o mouse sobre o elemento', () => {
        cy.login()

        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('a[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')

    })
})