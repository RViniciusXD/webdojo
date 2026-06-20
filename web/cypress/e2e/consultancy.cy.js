import { personal, company } from '../fixtures/consultancy.json'

describe('Formulario de Consultoria', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar consultoria individual', () => {
        cy.fillConsultancyForm(personal)
        cy.submitConsultancyForm()
        cy.validateConsultacyModal()
    })

    it('Deve solicitar consultoria In Company', () => {
        cy.fillConsultancyForm(company)
        cy.submitConsultancyForm()
        cy.validateConsultacyModal()
    })

    it('Deve validar os campos obrigatórios', () => {
        cy.submitConsultancyForm()

        const requiredFields = [
            { label: 'Nome Completo', errorMessage: 'Campo obrigatório' },
            { label: 'Email', errorMessage: 'Campo obrigatório' },
            { label: 'termos de uso', errorMessage: 'Você precisa aceitar os termos de uso' }
        ]

        requiredFields.forEach(({ label, errorMessage }) => {
            cy.contains('label', label)
                .parent()
                .find('p')
                .should('be.visible')
                .and('have.text', errorMessage)
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })
    })
})



