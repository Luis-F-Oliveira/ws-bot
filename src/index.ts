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
    async main() 
    {
        const account = await openAccountJson('./json/account.json')
        const authenticateService = new AuthenticateService()
        const sector = new Sector()

        const response = await authenticateService.login(account)
        if (response.success) {
            const auth = Authenticate.getInstance()
            auth.setToken(response.token)
            auth.setUser(response.user)
        }

        let sectorsMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus orci massa, sagittis at quam eget, sodales tempor augue. Nam sit amet fringilla justo. Cras nec orci posuere, fermentum ligula a, tristique elit. Morbi ultrices scelerisque dui ut porta. Vestibulum tincidunt neque vitae nulla finibus, eu dictum sem pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc nec eros gravida, porta purus pharetra, varius augue. Aenean fermentum quis tortor ut scelerisque. Suspendisse pharetra faucibus porta. Sed sed scelerisque nisi. Proin imperdiet in quam a bibendum. Quisque ut gravida magna. \n\n'

        const sectors = await sector.getIndex()
        if (sectors) {
            sectors.forEach((item, index) => {
                sectorsMessage += `\n${index+1}° ${item.name}`
            })

            let choice = 1

            const chosenSector = sectors[choice - 1]
            const chosenSectorId = chosenSector.id

            const operations = new Operations({ sector: chosenSectorId.toString() })
            
            console.log(await operations.access('3'))
            console.log(await operations.access('1'))
            console.log(await operations.access('2'))
            console.log(await operations.previous())
            console.log(await operations.access('1'))
        }
    }
}

const bot = new WSBOT()
bot.main()