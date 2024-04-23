import Authenticate from "../class/authenticate"
import { ICommands } from "../class/commands"
import { api } from "./axios"

interface CommandServiceProps {
    success: boolean
    data?: ICommands[]
}

/**
 * Serviço para coleta dos comandos
 */
export default class CommandService
{
    /**
     * Função para a coleta de um array referenciando o setor e retorno em promise
     * 
     * @param sector String
     * @returns success: boolean, data?: ICommands[]
     */
    start(sector: string): Promise<CommandServiceProps>
    {
        return new Promise(async (resolve, reject) => {
            const token = Authenticate.getInstance().getToken()
            await api.get(`commands/start/${sector}`, {
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

    /**
     * Função para coleta de um array de comandos e retorno em promise
     * 
     * @param token String
     * @returns success: boolean, data?: ICommands[]
     */
    index(token: string): Promise<CommandServiceProps>
    {
        return new Promise(async (resolve, reject) => {
            console.log('Index')
        })
    }

    /**
     * Função para coleta de um array especifico e retorno em promise
     * 
     * @param token String
     * @param id String
     * @returns success: boolean, data?: ICommands[]
     */
    show(token: string, id: string): Promise<CommandServiceProps>
    {
        return new Promise(async (resolve, reject) => {
            console.log('Show')
        })
    }
}