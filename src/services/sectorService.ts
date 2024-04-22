import { ISector } from "../class/sectors"
import { api } from "./axios"

interface SectorServiceProps {
    success: boolean
    data?: ISector[]
}

/**
 * Serviço para coleta dos setores
 */
export default class SectorService
{
    /**
     * Função para coleta de um array de setores e retorno em promise
     * 
     * @param token String
     * @returns success: boolean, data?: ISector[]
     */
    index(token: string): Promise<SectorServiceProps>
    {
        return new Promise(async (resolve, reject) => {
            await api.get('sectors', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                resolve({ success: true, data: response.data })
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}