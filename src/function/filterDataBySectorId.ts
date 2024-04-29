import { ICommands } from "../class/commands"

export function filterDataBySectorId(data: ICommands[] | undefined, sectorId: number)
{
    if (data) {
        return data.filter(item => item.sector_id === sectorId)
    }
}