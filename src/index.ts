import Operations from "./class/operations"
import Authenticate from "./class/authenticate"
import { openAccountJson } from "./function/openAccountJson"
import AuthenticateService from "./services/authenticateService"
import Sector from "./class/sectors"
const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

interface IRecipents {
    [key: string]: boolean
}

/**
 * Classe principal do WSBOT
 */
class WSBOT {
    /**
     * Primeira mensagem exibida ao iniciar uma conversa
     * 
     * @return String
     */
    welcome()
    {
        let welcomeMessage: string = ''

        const data = new Date()
        const hour = data.getHours()

        if (hour >= 6 && hour < 12) {
            welcomeMessage = "Bom dia!"
        } else if (hour >= 12 && hour < 18) {
            welcomeMessage = "Boa tarde!"
        } else {
            welcomeMessage = "Boa noite!"
        }

        return welcomeMessage = `${welcomeMessage} Eu sou um`
    }

    /**
     * Verifica se só contem número
     * 
     * @param str String
     * @returns boolean
     */
    checkNumber(str: string) {
        return /^\d+$/.test(str);
    }

    /**
     * Função main, responsável por rodar todo o script do WSBOT
     */
    async main() 
    {
        const account = await openAccountJson('./json/account.json')
        const authenticateService = new AuthenticateService()
        const sector = new Sector()
        const operations = new Operations()

        const response = await authenticateService.login(account)
        if (response.success) {
            const auth = Authenticate.getInstance()
            auth.setToken(response.token)
            auth.setUser(response.user)
        }
        
        const client = new Client()
        const sectors = await sector.getIndex()
        
        client.on('ready', () => {
            console.log('Client is ready!')
        })
        
        client.on('qr', (qr: string) => {
            qrcode.generate(qr, { small: true })
        })

        const recipients: IRecipents = {};
        const executedOnce: Record<string, boolean> = {};
        client.on('message', async (msg: any) => {
            const sender = msg.from;
            const message = msg.body;
        
            // Verifica se a mensagem não veio do próprio bot, é de um contato individual, e não é uma mensagem de grupo
            if (!msg.fromMe && msg.from.includes('@c.us') && !msg.isGroupMsg) {
                // Verifica se o remetente já recebeu a mensagem de boas-vindas
                if (!recipients[sender]) {
                    client.sendMessage(sender, this.welcome()); // Corrigido aqui
                    recipients[sender] = true;
                }
        
                // Verifica se a mensagem é um número e ainda não foi processada
                if (this.checkNumber(message)) { // Corrigido aqui
                    
                }
        
                // Verifica se o remetente já executou o código para esta mensagem
                if (!executedOnce[sender]) {
                    let sectorsMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus orci massa, sagittis at quam eget, sodales tempor augue. Nam sit amet fringilla justo. Cras nec orci posuere, fermentum ligula a, tristique elit. Morbi ultrices scelerisque dui ut porta. Vestibulum tincidunt neque vitae nulla finibus, eu dictum sem pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae Nunc nec eros gravida, porta purus pharetra, varius augue. Aenean fermentum quis tortor ut scelerisque. Suspendisse pharetra faucibus porta. Sed sed scelerisque nisi. Proin imperdiet in quam a bibendum. Quisque ut gravida magna. \n\n';
        
                    const sectors = await sector.getIndex();
                    if (sectors) {
                        sectors.forEach((item, index) => {
                            sectorsMessage += `\n${index+1}° ${item.name}`;
                        });
        
                        let startMessage = await operations.startMessage()
                        client.sendMessage(sender, sectorsMessage);
                        client.sendMessage(sender, startMessage);
        
                        // Comandos que só devem ser executados uma vez
                        console.log('Comando que só deve ser executado uma vez');
        
                        // Marca como executado para este remetente
                        executedOnce[sender] = true;
                    }
                }
            }
        });            
        
        client.initialize()
        
        // let msg = 2

        

        // const operations = new Operations({ sector: chosenSectorId.toString() })
    }
}

const bot = new WSBOT()
bot.main()