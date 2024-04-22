import * as fs from 'fs'

export interface JSONData<T> {
    [key: string]: T
}

/**
 * Função para ler, processar e enviar uma promise com o arquivo JSON 
 * 
 * @param path 
 * @return IAccount
 */
export function openAccountJson(path: string): Promise<JSONData<string>>
{
    return new Promise((resolve, reject) => {
        // Lê o arquivo JSON
        fs.readFile(path, 'utf8', (err, data) => {
            // Verifica se foi possivel ler o arquivo
            if (err) {
                console.log('Erro ao ler arquivo: ', err)
                return
            }
    
            try {
                // Analisa o conteúdo JSON e resolve a Promise com o objeto JSON
                const objectJSON = JSON.parse(data)
                resolve(objectJSON)
            } catch (error) {
                console.error('Erro ao analisar o conteúdo JSON: ', error)
                
                // Rejeita a Promise com o erro de análise JSON
                reject(error)
            }
        })
    })
}