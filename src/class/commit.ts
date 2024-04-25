import CommitService, { IData } from "../services/commitService"

/**
 * Classe responsavel pela coleta de comandos no banco de dados
 */
export default class Commit
{
    private commit: CommitService

    /**
     * Inicia a classe já instanciando um CommandService
     */
    constructor()
    {
        this.commit = new CommitService()
    }

    /**
     * Salva os commits no banco de dados
     * 
     * @param data IData
     */
    async store(data: IData)
    {
        await this.commit.store(data)
    }
}
