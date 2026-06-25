Cypress.Commands.add('postUser', (data) => {
    return cy.api({
        method: 'POST',
        url: '/api/users/register',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('getUsers', () => {
    return cy.api({
        method: 'GET',
        url: '/api/users',
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('putUser', (id, data) => {
    return cy.api({
        method: 'PUT',
        url: `/api/users/${id}`,
        body: data,
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('deleteUser', (id) => {
    return cy.api({
        method: 'DELETE',
        url: `/api/users/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
})