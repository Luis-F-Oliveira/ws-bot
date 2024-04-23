import Command from "./commands"

/**
 * Classe responsável para operações do bot
 */
export default class Operations
{
    private id: string | null
    private commands: Command

    /**
     * @param params IOperationsParams
     */
    constructor()
    {
        this.commands = new Command()
        this.id = null
    }

    /**
     * Inicia conversa a partir com o setor selecionado
     * 
     * @return void
     */
    async start(sector: string)
    {
        const commands = await this.commands.getStart(sector)
        console.log(commands)
    }

    /**
     * Acessa a pergunta que foi selecionada enviando o id
     * 
     * @param id String | NULL
     * @return void
     */
    async access(id: string)
    {
        //
    }

    /**
     * Retorna a conversa em um comando
     * 
     * @return void
     */
    async previous()
    {
        //
    }
}