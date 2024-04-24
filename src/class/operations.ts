import Command, { ICommands } from "./commands"

interface IOperationsParams {
    sector: string
}

/**
 * Classe responsável para operações do bot
 */
export default class Operations
{
    private id: Array<string>
    private sector: string
    private commands: Command

    /**
     * @param params IOperationsParams
     */
    constructor(params: IOperationsParams)
    {
        this.commands = new Command()
        this.sector = params.sector
        this.id = []
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
            startMessage += `${index+1}° ${item.name}\n`
        })

        return startMessage
    }

    /**
     * Acessa a pergunta que foi selecionada enviando o id
     * 
     * @param choice String
     * @return String
     */
    async getId(choice: string)
    {
        if (this.id.length === 0) {
            const commands = await this.commands.getStart(this.sector)
            if (commands) {
                const chosenSector = commands[parseInt(choice) - 1]
                const chosenSectorId = chosenSector.id

                this.id.push(chosenSectorId.toString())
                return
            }
        }

        const commands = await this.commands.getShow(this.id[this.id.length - 1])
        const dataArray = Array.isArray(commands) ? commands : [commands]
        dataArray.forEach((item) => {
            const chosenSector = item?.replies[parseInt(choice) - 1]
            const chosenSectorId = chosenSector?.id
            
            if (chosenSectorId) {
                this.id.push(chosenSectorId.toString())
            }
        })
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
            await this.getId(choice)
        }

        const commands = await this.commands.getShow(this.id[this.id.length - 1])
        const dataArray = Array.isArray(commands) ? commands : [commands]
        let message = ''
        dataArray.forEach((item) => {
            message += `${item?.name}\n`
            if (item?.replies) {
                message += `${item?.return}\n\nMais opções:`
                item.replies.forEach((item, index) => {
                    message += `\n${index+1}° ${item.name}`
                })
            } else {
                message += `${item?.return}`
            }
        })

        return message
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
}