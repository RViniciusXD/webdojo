describe('POST /api/users/register', () => {
    it('Deve cadastrar um novo usuário', () => {
        const user = {
            name: 'Deadpool',
            email: 'deadpool@marvel.com.br',
            password: 'Senha123'
        }

        cy.task('deleteUser', user.email)

        cy.postUser(user).then((res) => {
            expect(res.status).to.eq(201)

            expect(res.body.message).to.eq('User successfully registered!')
            expect(res.body.user.id).match(/^\d+$/)
            expect(res.body.user.name).to.eq(user.name)
            expect(res.body.user.email).to.eq(user.email)
        })
    })
    it('Não deve cadastrar com email duplicado', () => {
        const user = {
            name: 'Spider Man',
            email: 'spider.man@marvel.com.br',
            password: 'Senha123'
        }

        cy.task('deleteUser', user.email)

        cy.postUser(user).then((res) => {
            expect(res.status).to.eq(201)
        })
        cy.postUser(user).then((res) => {
            expect(res.status).to.eq(409)
            expect(res.body.message).to.eq('Email already registered!')
        })
    })
    it('O campo name deve ser obrigatório', () => {
        const user = {
            email: 'iron-man@marvel.com.br',
            password: 'Senha123'
        }

        cy.postUser(user).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body.message).to.eq('Name is required!')
        })
    })
    it('O campo email deve ser obrigatório', () => {
        const user = {
            name: 'Hulk',
            password: 'Senha123'
        }

        cy.postUser(user).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body.message).to.eq('E-mail is required!')
        })
    })
    it('O campo password deve ser obrigatório', () => {
        const user = {
            name: 'Black Panter',
            email: 'balck-panter@marvel.com.br'
        }

        cy.postUser(user).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body.message).to.eq('Password is required!')
        })
    })
    it('Não deve passar quando o JSON está mal formatado', ()=> {
        const user = `{
            "name": "Moon Knigth",
            "email": "moon.knigth@marvel.com.br"
            "password": "Senha123"
        }`

        cy.postUser(user).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body.message).to.eq('Invalid JSON format.')
        })
    })
})