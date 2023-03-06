
export interface itemInCart {
    id: number; 
    amount:number; 
    price:number; 
    total:number;
}

export type cartFiller = {cartItems: itemInCart[];}