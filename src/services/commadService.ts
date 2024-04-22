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