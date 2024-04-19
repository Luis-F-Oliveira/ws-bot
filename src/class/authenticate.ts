interface IAuthenticateParams {
    token: string
}

/**
 * Classe responsavel pela authenticacao do usuario
 */
export default class Authenticate
{
    private token: string

    /**
     * @param token String
     */
    constructor(params: IAuthenticateParams)
    {
        this.token = params.token
    }

    /**
     * Metodo para retornar o token de acesso
     * 
     * @return this.token: String
     */
    getToken()
    {
        return this.token
    }
}