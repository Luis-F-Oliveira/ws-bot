import { ICommands } from "../class/commands"

interface CommandServiceProps {
    success: boolean
    data: ICommands[]
}

export default class CommandService: Promise<CommandServiceProps>
{
    index()
    {
        return new Promise(async (resolve, reject) => 
        {

        })
    }
}