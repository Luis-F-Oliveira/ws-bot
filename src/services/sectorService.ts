import Authenticate from "../class/authenticate"
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
     * @returns success: boolean, data?: ISector[]
     */
    index(): Promise<SectorServiceProps>
    {
        return new Promise(async (resolve, reject) => {
            const token = Authenticate.getInstance().getToken()

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