import Authenticate from "./class/authenticate"
import Sector from "./class/sectors"
import { openAccountJson } from "./function/openAccountJson"
import AuthenticateService from "./services/authenticateService"

/**
 * Classe principal do WSBOT
 */
class WSBOT {
    private auth: Authenticate | null = null

    /**
     * Função main, responsável por rodar todo o script do WSBOT
     */
    async main() {
        //#region ========= Autenticação =========
        // Para obter mais informações sobre a autenticação, consulte a seção "Autenticação" no arquivo README.

        const account = await openAccountJson('./json/account.json')
        const authenticateService = new AuthenticateService()

        const response = await authenticateService.login(account)

        if (response.success && response.token) {
            this.auth = new Authenticate({ token: response.token })
        }

        //#endregion

        //#region ========= Iniciar BOT =========
        // Para obter mais informações sobre o inicio do bot, consulte a seção "Iniciar BOT" no arquivo README.

        // Depois adicionar o sistema de ligar o whatsapp-web.js

        //#region ========= Mensagem de Boas Vindas =========

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

        //#endregion

        //#region ========= Perguntas =========

        if (this.auth) {
            const sector = new Sector()
            const sectors = await sector.getIndex(this.auth.getToken())
        }

        //#endregion

        //#endregion
    }
}

const bot = new WSBOT()
bot.main()