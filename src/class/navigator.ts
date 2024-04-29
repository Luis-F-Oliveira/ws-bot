import { ICommands } from "./commands"

/**
 * Classe responsavel pela navegação do sistema WSBOT
 */
export default class Navigator 
{
    private filteredData: ICommands[] = []
    public currentStack: { itemIndex: number; replyIndex: number }[] = []

    constructor(private data: ICommands[] | undefined) { }

    /**
     * Função responsável para a filtragem de setores
     * 
     * @param sectorId Number
     * @returns String
     */
    filterDataBySectorId(sectorId: number) 
    {
        if (this.data) {
            this.filteredData = this.data.filter(item => item.sector_id === sectorId)
            this.currentStack = []

            let resultString = ''
            this.filteredData.forEach((item, index) => {
                resultString += `${index + 1}. ${item.name}\n`
            })
            return resultString
        }
    }

    /**
     * Função responsável para o selecionamento da primeira pergunta
     * 
     * @param index Number
     * @returns String
     */
    selectItem(index: number) 
    {
        if (index >= 1 && index <= this.filteredData.length) {
            const itemIndex = index - 1
            const currentItem = this.filteredData[itemIndex]
            let resultString = `${currentItem.name}: ${currentItem.return}\n`
            if (currentItem.replies.length > 0) {
                resultString += `Mais:\n`
                currentItem.replies.forEach((reply, index) => {
                    resultString += `${index + 1}. ${reply.name}\n`
                })
                // Push current state to stack
                this.currentStack.push({ itemIndex, replyIndex: -1 })
            }
            return resultString
        }
        return 'Pergunta inválida, tente novamente.'
    }

    /**
     * Função responsável para o selecionamento dos filhos da pergunta anterior
     * 
     * @param index Number
     * @returns String
     */
    selectReply(index: number) 
    {
        const currentStackItem = this.currentStack[this.currentStack.length - 1]
        if (!currentStackItem) return 'Nenhuma pergunta selecionada!'
        const currentItem = this.filteredData[currentStackItem.itemIndex]
        if (index >= 1 && index <= currentItem.replies.length) {
            const replyIndex = index - 1
            const currentReply = currentItem.replies[replyIndex]
            let resultString = `${currentReply.name}: ${currentReply.return}\n`
            if (currentReply.replies.length > 0) {
                resultString += `Mais:\n`
                currentReply.replies.forEach((reply, index) => {
                    resultString += `${index + 1}. ${reply.name}\n`
                })
                this.currentStack.push({ itemIndex: currentStackItem.itemIndex, replyIndex })
            }
            return resultString
        }
        return 'Pergunta inválida, tente novamente.'
    }

    /**
     * Responsável por retornar a pergunta anterior
     * 
     * @returns String
     */
    goBack() 
    {
        const previousState = this.currentStack.pop()
        if (previousState) {
            const currentItem = this.filteredData[previousState.itemIndex]
            let resultString = `${currentItem.name}: ${currentItem.return}\n`
            if (currentItem.replies.length > 0) {
                resultString += `Replies:\n`
                currentItem.replies.forEach((reply, index) => {
                    resultString += `${index + 1}. ${reply.name}\n`
                })
            }
            return resultString
        }
        return 'Sem mais informações. Para retornar ao inicio, digite !iniciar'
    }
}