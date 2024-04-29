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
    private token: string

    /**
     * Inicia o token
     */
    constructor()
    {
        this.token = Authenticate.getInstance().getToken()
    }

    /**
     * Função para a coleta de um array referenciando o setor e retorno em promise
     * 
     * @param sector String
     * @returns success: boolean, data?: ICommands[]
     */
    start(sector: string): Promise<CommandServiceProps>
    {
        return new Promise(async (resolve, reject) => {
            await api.get(`commands/start/${sector}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
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
     * Função para coleta de um array com todos os camandos
     * 
     * @returns success: boolean, data?: ICommands[]
     */
    index(): Promise<CommandServiceProps> 
    {
        return new Promise(async (resolve, reject) => {
            await api.get(`commands`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
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
     * Função para coleta de um array especifico e retorno em promise
     * 
     * @param id String
     * @returns success: boolean, data?: ICommands[]
     */
    show(id: string): Promise<CommandServiceProps>
    {
        return new Promise(async (resolve, reject) => {
            await api.get(`commands/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
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