
export interface itemInTank {
    id: number; amount:number; value:number;
}

export interface equipmentInTank {
    type: string; value:number
}

export type tankFiller = {
    fishes: itemInTank[];
    plants: itemInTank[];
}