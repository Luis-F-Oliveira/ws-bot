const account = require('../json/account.json')
const axios = require('axios')
const User = require('./user.js')

class Auth
{
    constructor()
    {
        this.user = undefined
    }

    async login()
    {
        await axios.post('https://wsdatabase.blucaju.com.br/api/login', {
            'email': account.email,
            'password': account.password
        })
        .then((response) => {
            const { token, user } = response.data
            this.user = new User(token, user.id, user.name, user.email, user.sector_id)
            return this.user
        })
        .catch((error) => {
            throw error
        })
    }
}

class Database extends Auth
{
    constructor()
    {
        super()
        this.token = null
        this.user = null
    }

    async authenticate()
    {
        try {
            await this.login()
            this.token = this.user.token
            this.user = this.user
        } catch (error) {
            throw error
        }
    }

    async getCommands()
    {
        try {
            if (!this.token) {
                await this.authenticate()
            }

            return await axios.get('https://wsdatabase.blucaju.com.br/api/commands', {
                'headers': {
                    'Authorization': `Bearer ${this.user.token}`
                }
            })
            .then((response) => {
                const filteredData = response.data.filter(item => item.sector_id === this.user.sector)
                return filteredData
            })
            .catch((error) => {
                throw error
            })
        } catch (error) {
            throw error
        }
    }

    async getUser()
    {
        try {
            if (!this.token) {
                await this.authenticate()
            }

            return this.user
        } catch (error) {
            throw error
        }
    }

    async store(user, command, question, number)
    {
        try {
            if (!this.token) {
                await this.authenticate()
            }

            await axios.post('https://wsdatabase.blucaju.com.br/api/commits', {
                'user': user,
                'command': command,
                'question': question,
                'number': number
            },
            {
                'headers': {
                    'Authorization': `Bearer ${this.user.token}`
                }
            })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                throw error
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = { Auth, Database }