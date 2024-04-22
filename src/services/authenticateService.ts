import { JSONData } from "../function/openAccountJson"
import { api } from "./axios"

interface IAuthenticateProps {
    success: boolean
    token: string
}

/**
 * Serviço para authenticação entre bot e servidor
 */
export default class AuthenticateService
{
    /**
     * Função de autenticação
     * 
     * @param values JSONData
     * @returns Token String
     */
    login(values: JSONData<string>): Promise<IAuthenticateProps>
    {
        return new Promise(async (resolve, reject) => {
            await api.post('login', values)
                .then((response) => {
                    resolve({ success: true, token: response.data.token })
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    /**
     * Função para desligar o token
     * 
     * @param token String
     */
    logout(token: string): Promise<IAuthenticateProps>
    {
        return new Promise(async (resolve, reject) => {
            //
        })
    }
}