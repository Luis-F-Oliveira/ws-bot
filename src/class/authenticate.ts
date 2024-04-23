/**
 * Classe responsavel pela authenticacao do usuario
 */
export default class Authenticate
{
    private static instance: Authenticate
    private token: string

    /**
     * @param token String
     */
    constructor()
    {
        this.token = ''
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
        return Authenticate.instance;
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
}