import SectorService from "../services/sectorService"

export interface ISector {
    id: number
    name: string
}

/**
 * Classe responsavel pela coleta de setores no banco de dados
 */
export default class Sector
{
    private sectors: SectorService

    /**
     * Inicia a classe já instanciando um CommandService
     */
    constructor()
    {
        this.sectors = new SectorService()
    }

    /**
     * Pesquisa e devolve uma promise com um array de sectors
     * 
     * @param token: String
     * @return ISector[]
     */
    async getIndex(token: string)
    {
        const response = await this.sectors.index(token)

        if (response.success && response.data) {
            return response.data
        }
    }
}