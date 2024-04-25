import Authenticate from "../class/authenticate"
import { api } from "./axios"

interface CommitServiceProps {
    success: boolean
}

export interface IData {
    user_id: number
    command_id: number
    sector_id: number
}

/**
 * Serviço para coleta dos comandos
 */
export default class CommitService
{
    private token: string

    /**
     * Inicia o token
     */
    constructor()
    {
        this.token = Authenticate.getInstance().getToken()
    }

    /**
     * Função para a salvar os commits feitos
     * 
     * @param data IData
     * @returns success: boolean
     */
    store(data: IData): Promise<CommitServiceProps>
    {
        return new Promise(async (resolve, reject) => {
            await api.post('commits', data, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(() => {
                resolve({ success: true })
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}