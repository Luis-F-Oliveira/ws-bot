export interface IUser {
    id: number
    name: string
    email: string
    is_bot: boolean
    access_id: number
    sector_id: number
}

/**
 * Classe responsavel pela authenticacao do usuario
 */
export default class Authenticate
{
    private static instance: Authenticate
    private token: string
    private user: IUser

    /**
     * @param token String
     */
    constructor()
    {
        this.token = ''
        this.user = { id: 0, name: '', email: '', is_bot: false, access_id: 0, sector_id: 0 }
    }

    /**
     * Método estático para obter a instância única da classe Authenticate.
     * Se a instância ainda não existir, uma nova instância é criada.
     * 
     * @returns A instância única da classe Authenticate.
     */
    public static getInstance(): Authenticate
    {
        if (!Authenticate.instance) {
            Authenticate.instance = new Authenticate()
        }
        return Authenticate.instance
    }

    /**
     * Responsável por setar o token da instância 
     * 
     * @param token String
     */
    public setToken(token: string)
    {
        this.token = token
    }

    /**
     * Metodo para retornar o token de acesso
     * 
     * @return this.token String
     */
    getToken()
    {
        return this.token
    }

    /**
     * Responsável por setar o usuario da instância
     * 
     * @param user IUser
     */
    public setUser(user: IUser)
    {
        this.user = user
    }

    /**
     * Metodo para retornar o usuario logado
     * 
     * @return this.user IUser
     */
    public getUser()
    {
        return this.user
    }
}