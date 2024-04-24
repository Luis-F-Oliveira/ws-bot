import CommandService from "../services/commandService"

export interface ICommands {
    id: number
    name: string
    return: string
    parent_id: number | null
    sector_id: number
    replies: ICommands[]
    sector: ISector
}

interface ISector {
    id: number
    name: string
}

/**
 * Classe responsavel pela coleta de comandos no banco de dados
 */
export default class Command
{
    private commands: CommandService

    /**
     * Inicia a classe já instanciando um CommandService
     */
    constructor()
    {
        this.commands = new CommandService()
    }

    /**
     * Pesquisa e devolve uma promise com um array de comandos
     * 
     * @param sector: String
     * @return ICommands[]
     */
    async getStart(sector: string)
    {
        const response = await this.commands.start(sector)

        if (response.success) {
            return response.data
        }
    }

    /**
     * Pesquisa e devolve uma promise com um array de comandos
     * 
     * @return ICommands[]
     */
    async getIndex()
    {
        //
    }

    /**
     * Pesquisa e devolve uma promise com um array de comandos especificos
     * 
     * @param id: String
     * @return ICommands[]
     */
    async getShow(id: string)
    {
        const response = await this.commands.show(id)

        if (response.success) {
            return response.data
        }
    }
}
