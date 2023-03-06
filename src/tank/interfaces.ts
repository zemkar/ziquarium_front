
export interface itemInTank {
    id: number; amount:number; value:number;
}

export interface tankDimensions { volume: number, length: number, width: number, height: number }
export interface filterUsed { power: number, type: string }
export interface compressorUsed { power: number, volume: number }
export interface light { power: number, lumen: number, color: string }

export interface equipmentInTank {
    dimensions: tankDimensions,
    filter: filterUsed,
    compressor: compressorUsed,
    light: light,
    heater: boolean
}

export type tankFiller = {
    fishes: itemInTank[];
    plants: itemInTank[];
}