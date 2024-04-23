import Operations from "./class/operations"
import Authenticate from "./class/authenticate"
import { openAccountJson } from "./function/openAccountJson"
import AuthenticateService from "./services/authenticateService"
import Sector from "./class/sectors"

/**
 * Classe principal do WSBOT
 */
class WSBOT {
    /**
     * Primeira mensagem exibida ao iniciar uma conversa
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

        welcomeMessage = `${welcomeMessage} Eu sou um`
    }

    /**
     * Função main, responsável por rodar todo o script do WSBOT
     */
    async main() {
        const account = await openAccountJson('./json/account.json')
        const authenticateService = new AuthenticateService()
        const operations = new Operations()
        const sector = new Sector()

        const response = await authenticateService.login(account)
        if (response.success) {
            const tokenService = Authenticate.getInstance()
            tokenService.setToken(response.token)
        }

        let sectorsMessage: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus orci massa, sagittis at quam eget, sodales tempor augue. Nam sit amet fringilla justo. Cras nec orci posuere, fermentum ligula a, tristique elit. Morbi ultrices scelerisque dui ut porta. Vestibulum tincidunt neque vitae nulla finibus, eu dictum sem pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc nec eros gravida, porta purus pharetra, varius augue. Aenean fermentum quis tortor ut scelerisque. Suspendisse pharetra faucibus porta. Sed sed scelerisque nisi. Proin imperdiet in quam a bibendum. Quisque ut gravida magna. Suspendisse ultricies condimentum volutpat. Suspendisse fringilla consectetur velit quis tristique. Mauris malesuada gravida est id mollis. \n\n'

        const sectors = await sector.getIndex()
        if (sectors) {
            sectors.forEach((item, index) => {
                sectorsMessage += `\n${index+1}° ${item.name}`
            })
        }

        console.log(sectorsMessage)
    }
}

const bot = new WSBOT()
bot.main()