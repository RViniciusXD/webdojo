import { getDiscoveryChannels, getTechs } from '../../support/utils'

Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('input[placeholder="Digite seu nome completo"]').type(form.name)
    cy.get('input[placeholder="Digite seu email"]').type(form.email)
    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)
    // .should('have.value', '(11) 99999-9999')
    cy.contains('div', 'Tipo de Consultoria')
        .find('select')
        .select(form.consultancyType)
    if (form.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('not.be.checked')
        cy.contains('div', 'CPF')
            .find('input')
            .type(form.document)
        // .should('have.value', '179.378.270-92')
    }
    if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('not.be.checked')
        cy.contains('div', 'CNPJ')
            .find('input')
            .type(form.document)
        // .should('have.value', '24.321.414/0001-80')
    }
    getDiscoveryChannels(form).forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })
    cy.get('input[type=file]')
        .selectFile(form.file, { force: true })
    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)
    getTechs(form).forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')
        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })
    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should('be.checked')
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário').click()
})

Cypress.Commands.add('validateConsultacyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})