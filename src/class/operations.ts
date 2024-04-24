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
     * @return string
     */
    async start(sector: string)
    {
        // let startMessage = '{name}\n{return}\n\nMais opções:\n'
        let startMessage = ''
        const commands = await this.commands.getStart(sector)
        commands?.forEach((item, index) => {
            startMessage += `${item.name}\n`
            startMessage += `${item.return}\n\nMais opções:\n`
            item.replies
        })

        return startMessage
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