import CommandService from "../services/commadService"

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
     * @param token: String
     * @return ICommands[]
     */
    getIndex(token: string)
    {
        //
    }

    /**
     * Pesquisa e devolve uma promise com um array de comandos especificos
     * 
     * @param token: String
     * @param id: String
     * @return ICommands[]
     */
    getShow(token: string, id: string)
    {
        //
    }
}