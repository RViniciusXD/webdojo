describe('Validando links', ()=> {

    beforeEach(()=> {
        cy.login()
    })
    it('Validando o link do Instagram', () => {
        cy.get('a[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .and('have.attr', 'target', '_blank')
    })

    it('Acessando link do Termo de Uso removendo o target blank', ()=> {
        cy.goTo('Formulários', 'Consultoria')

        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('h1', 'Termos de Uso').should('be.visible')

    })
})