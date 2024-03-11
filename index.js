const { Database } = require('./src/database.js')
const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

class App 
{
    constructor()
    {
        this.dbInstance = new Database()
        
        this.user = null
        this.commands = null
    }

    async main()
    {   
        const client = new Client()
        this.user = await this.dbInstance.getUser()
        this.commands = await this.dbInstance.getCommands()

        client.on('qr', (qr) => {
            console.log('Conta autênticada, iniciando aplicação...')
            qrcode.generate(qr, { small: true })
        })

        client.on('ready', () => {
            console.log('Sistema ligado e pronto!')
        })

        let recipients = {}
        client.on('message', async (msg) => {
            const sender = msg.from
            const messageContent = msg.body.toLowerCase()
            if (!msg.fromMe && msg.from.includes('@c.us') && !msg.isGroupMsg && !recipients[sender]) {
                let text = 'Lista de comandos: \n\n\n0° pergunta nao se encaixa;\n'
                for (const command of this.commands) {
                    text += `${command.id}° ${command.name};\n`
                }

                client.sendMessage(sender, text)
                recipients[sender] = true
            }

            if (!msg.isGroupMsg) {
                if (parseInt(messageContent) === 0 || messageContent === 'pergunta nao se encaixa') {
                    await msg.reply('Faça sua pergunta utilizando !pergunta. Exemplo: !pergunta gostaria de saber sobre...')
                }
    
                if (messageContent.includes('!pergunta')) {
                    await msg.reply('Pergunta salva, logo será respondida!')
                    await this.dbInstance.store(this.user.id, 8, messageContent, sender)
                }
    
                for (const command of this.commands) {
                    if (parseInt(messageContent) === command.id || messageContent === command.name) {
                        await msg.reply(command.return)
                        break
                    }
                }
            }
        })

        client.initialize()
    }
}

const app = new App()
app.main().catch(error => {
    console.error('Ocorreu um erro: ', error)
})