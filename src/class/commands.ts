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
    private commands: ICommands[]

    /**
     * Inicia uma busca nos dados do servidor
     */
    constructor()
    {

        this.commands = commands
    }
}