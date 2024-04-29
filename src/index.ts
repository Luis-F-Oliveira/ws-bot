import Authenticate from "./class/authenticate"
import Command, { ICommands } from "./class/commands"
import Sector from "./class/sectors"
import { openAccountJson } from "./function/openAccountJson"
import AuthenticateService from "./services/authenticateService"
const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

class Navigator {
    private filteredData: ICommands[] = [];
    public currentStack: { itemIndex: number; replyIndex: number }[] = []

    constructor(private data: ICommands[] | undefined) { }

    filterDataBySectorId(sectorId: number) {
        if (this.data) {
            this.filteredData = this.data.filter(item => item.sector_id === sectorId);
            this.currentStack = [];

            let resultString = '';
            this.filteredData.forEach((item, index) => {
                resultString += `${index + 1}. ${item.name}\n`;
            });
            return resultString;
        }
    }

    selectItem(index: number) {
        if (index >= 1 && index <= this.filteredData.length) {
            const itemIndex = index - 1;
            const currentItem = this.filteredData[itemIndex];
            let resultString = `${currentItem.name}: ${currentItem.return}\n`;
            if (currentItem.replies.length > 0) {
                resultString += `Replies:\n`;
                currentItem.replies.forEach((reply, index) => {
                    resultString += `${index + 1}. ${reply.name}\n`;
                });
                // Push current state to stack
                this.currentStack.push({ itemIndex, replyIndex: -1 });
            }
            return resultString;
        }
        return 'Invalid item index.';
    }

    selectReply(index: number) {
        const currentStackItem = this.currentStack[this.currentStack.length - 1];
        if (!currentStackItem) return 'No replies to select.';
        const currentItem = this.filteredData[currentStackItem.itemIndex];
        if (index >= 1 && index <= currentItem.replies.length) {
            const replyIndex = index - 1;
            const currentReply = currentItem.replies[replyIndex];
            let resultString = `${currentReply.name}: ${currentReply.return}\n`;
            if (currentReply.replies.length > 0) {
                resultString += `Replies:\n`;
                currentReply.replies.forEach((reply, index) => {
                    resultString += `${index + 1}. ${reply.name}\n`;
                });
                // Push current state to stack
                this.currentStack.push({ itemIndex: currentStackItem.itemIndex, replyIndex });
            }
            return resultString;
        }
        return 'Invalid reply index.';
    }

    goBack() {
        // Pop the last state from stack
        const previousState = this.currentStack.pop();
        if (previousState) {
            const currentItem = this.filteredData[previousState.itemIndex];
            let resultString = `${currentItem.name}: ${currentItem.return}\n`;
            if (currentItem.replies.length > 0) {
                resultString += `Replies:\n`;
                currentItem.replies.forEach((reply, index) => {
                    resultString += `${index + 1}. ${reply.name}\n`;
                });
            }
            return resultString;
        }
        return 'No previous state.';
    }
}

class WSBOT {
    async main() {
        const account = await openAccountJson('./json/account.json')
        const authenticateService = new AuthenticateService()

        const response = await authenticateService.login(account)
        if (response.success) {
            const auth = Authenticate.getInstance()
            auth.setToken(response.token)
            auth.setUser(response.user)
        }

        const sector = new Sector()
        const sectors = await sector.getIndex()

        const command = new Command()
        const commands = await command.getIndex()

        const client = new Client()

        client.on('ready', () => {
            console.log('Client is ready!')
        })

        client.on('qr', (qr: string) => {
            qrcode.generate(qr, { small: true })
        })

        const navigator = new Navigator(commands); // Defina navigator aqui

        client.on('message', async (message: any) => {
            if (message.fromMe && message.isGroupMsg) {
                return;
            };
        
            if (!sectors) {
                await message.reply('Os setores não foram carregados. Tente novamente mais tarde.');
                return;
            }
        
            if (message.body === '!iniciar') {
                let sectorList = 'Selecione um setor:\n';
                sectors.forEach((sector, index) => {
                    sectorList += `${index + 1}. ${sector.name}\n`;
                })

                await message.reply(sectorList)
            } else if (message.body.startsWith('!setor')) {
                const index = parseInt(message.body.split(' ')[1]);
                if (index >= 1 && index <= sectors.length) {
                    const selectedSectorId = sectors[index - 1].id;
                    const filteredDataString = navigator.filterDataBySectorId(selectedSectorId);
                    await message.reply(filteredDataString);
                } else {
                    await message.reply('Setor selecionado inválido. Tente novamente.');
                }
            } else if (message.body.startsWith('!selecionar')) {
                const index = parseInt(message.body.split(' ')[1]);
                if (!isNaN(index)) {
                    const currentStackItem = navigator.currentStack[navigator.currentStack.length - 1];
                    if (currentStackItem) {
                        const response = navigator.selectReply(index);
                        await message.reply(response);
                    } else {
                        const response = navigator.selectItem(index);
                        await message.reply(response);
                    }
                } else {
                    await message.reply('Comando de seleção inválido. Envie "!selecionar {index}" para selecionar um item ou reply.');
                }
            } else if (message.body === '!voltar') {
                const response = navigator.goBack();
                await message.reply(response);
            }
        })

        client.initialize();
    }
}

const app = new WSBOT()
app.main()