import Authenticate, { IUser } from "./authenticate"
import Command from "./commands"
import Commit from "./commit"

/**
 * Classe responsável para operações do bot
 */
export default class Operations
{
    private id: Array<string>
    private history: Array<string>
    private sector: string
    private commands: Command
    private user: IUser
    private commit: Commit

    constructor()
    {
        this.commands = new Command()
        this.commit = new Commit()
        this.sector = ''
        this.id = []
        this.history = []
        this.user = Authenticate.getInstance().getUser()
    }

    /**
     * Salvar o setor escolhido
     * 
     * @param sector String
     */
    setSector(sector: string)
    {
        this.sector = sector
    }

    /**
     * Inicia conversa a partir com o setor selecionado
     * 
     * @return string
     */
    async startMessage()
    {
        let startMessage = 'Lista de perguntas:\n'
        const commands = await this.commands.getStart(this.sector)
        commands?.forEach((item, index) => {
            startMessage += `\n${index+1}° ${item.name}`
        })

        return startMessage
    }

    /**
     * Retorna uma mensagem padrão de erro caso a pessoa digite um valor inválido
     * 
     * @return String
     */
    invalidMessage()
    {
        return 'Pergunta inválido, tente novamente.'
    }

    /**
     * Método responsavel para o salvamento das perguntas dentro do banco de dados
     * 
     * @return void
     */
    async storeCommand()
    {
        if (this.id.length === 0) { 
            return 
        }

        const data = { 
            user_id: this.user.id, 
            command_id: parseInt(this.id[this.id.length - 1]), 
            sector_id: parseInt(this.sector) 
        }
        
        await this.commit.store(data)
    }

    /**
     * Acessa a pergunta que foi selecionada enviando o id
     * 
     * @param choice String
     * @return Promise<boolean>
     */
    async getId(choice: string)
    {
        if (this.id.length === 0) {
            const commands = await this.commands.getStart(this.sector)
            if (commands) {
                const index = parseInt(choice) - 1
                const chosenSector = commands[index]
                if (!chosenSector) { return false }
                const chosenSectorId = chosenSector.id
    
                this.id.push(chosenSectorId.toString())
                this.history.push(chosenSectorId.toString())
                return true
            }
        } else {
            const commands = await this.commands.getShow(this.id[this.id.length - 1])
            const dataArray = Array.isArray(commands) ? commands : [commands]
            for (const item of dataArray) {
                const index = parseInt(choice) - 1
                if (item && item.replies && index >= 0 && index < item.replies.length) {
                    const chosenSector = item.replies[index]
                    if (chosenSector) {
                        const chosenSectorId = chosenSector.id
                        this.id.push(chosenSectorId.toString())
                        this.history.push(chosenSectorId.toString())
                        return true
                    }
                }
            }
        }

        return false
    }

    /**
     * Acessa a pergunta que foi selecionada enviando o id
     * 
     * @param choice String | undefined
     * @return string
     */
    async access(choice: string | undefined)
    {
        if (choice) {
           const errorMessage = await this.getId(choice)
           if (!errorMessage) { return this.invalidMessage() }
        }

        await this.storeCommand()

        try {
            const commands = await this.commands.getShow(this.id[this.id.length - 1])

            const dataArray = Array.isArray(commands) ? commands : [commands]
            let message = ''

            dataArray.forEach((command) => {
                if (command) {
                    message += `Pergunta: ${command.name}`
                    message += `\nResposta: ${command.return}`

                    if (command.replies && command.replies.length !== 0) {
                        message += `\n\nMais opções:`
                        command.replies.forEach((reply, index) => {
                            message += `\n${index + 1}° ${reply.name}`
                        })
                    }
                }
            })

            return message
        } catch (error: any) {
            if (error.data === undefined) {
                return this.startMessage()
            }
        }
    }


    /**
     * Retorna a conversa em um comando
     * 
     * @return String
     */
    async previous()
    {
        this.id.pop()
        return this.access(undefined)
    }

    /**
     * Retorna o histórico de comandos usados
     * 
     * @return String
     */
    getHistory()
    {
        return this.history
    }
}