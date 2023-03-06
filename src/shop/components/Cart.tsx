import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getFishes } from '../../fish/actions/fishes';
import { getPlants } from '../../plants/actions/plants';
import { cartItemAmount, clearCart, restoreCart } from '../actions/cart';
import { itemInCart } from '../interfaces';
import { createOrder } from '../actions/order';

const Cart = () => {
    const dispatch: any = useAppDispatch();
    const { cartItems } = useAppSelector(state => state.shopReducer.shopCartReducer); // selected items
    const { user } = useAppSelector(state => state.authReducers.auth)

    const { fishList } = useAppSelector(state => state.fishesReducer.fishes); // fish in DB
    if (!fishList) {
        dispatch(getFishes())
    }
    const { plantList } = useAppSelector(state => state.plantsReducer.plants); // plants in DB
    if (!plantList) {
        dispatch(getPlants())
    }

    useEffect(() => {
        if (cartItems?.length <= 0) {
            var storedItems:any = localStorage.getItem("cartItems")
            if (storedItems) dispatch(restoreCart())
        }
    }, [cartItems])
    

    const [totalToPay, setTotalToPay] = useState<number>(0);
    useEffect(() => {
        setTotalToPay(0)
        cartItems.map((e:any)=>{setTotalToPay((prev:number) => prev + e?.total)})
    }, [cartItems])
    

    const changeAmount = (id: number, amount: number, price:number) => {
        console.log("changeAmount", id, amount);
        if (id && (amount || amount === 0)) {
            if (amount >= 0) {
                dispatch(cartItemAmount(id, amount, price))
            }
        }
    }

    const removeCartItems = () => {
        dispatch(clearCart())
    }

    const orderFromCart = () => {
        const orderItems = cartItems.map((e:any)=>{
            var itemToOrder = {
                "product": e.id,
                "quantity": e.amount,
                "price": e.price,
                "cost": e.total}
            return itemToOrder
        })
        console.log("to order: user id", user.id, " | total to pay", totalToPay, " | items in order: ", orderItems);
        dispatch(createOrder({"buyer":user.id, "order_items":orderItems, "total_cost":totalToPay}))
        // dispatch(clearCart())
        
    }

    return (
        <div style={{padding:"3%"}}>
            <table style={{ width:"90%"}}>
            {cartItems && <div className='cartItemsPanel'><tr><td style={{width:"40%"}}></td><td style={{width:"19em", textAlign:"right"}}>
                {cartItems?.length > 0 ? <button onClick={removeCartItems} >Remove all items</button> : "Cart is empty"}</td><td style={{width:"10%", minWidth:"6em"}}></td></tr>
                <tr><td>&nbsp;</td></tr>
                {cartItems && cartItems.map((itemInCart: itemInCart) => {
                    var fishData: any = fishList?.filter((e: any) => { return e?.id === itemInCart?.id })[0];
                    var plantData: any = plantList?.filter((e: any) => { return e?.id === itemInCart?.id })[0];
                    var itemData: any = fishData || plantData;
                    console.log("TankIndex - item in map:", itemInCart, "\n item:", itemData);
                    return (<tr key={itemInCart.id}><>
                        <td>
                        {itemInCart.id + ") " + itemData?.name + " " + itemInCart.amount + " pts. * " + itemInCart.price}
                        </td><td style={{textAlign:"center"}}>
                        <button onClick={() => changeAmount(itemInCart.id, itemInCart.amount - 5, itemInCart.price)} disabled={(itemInCart === undefined) || (itemInCart.amount < 6)}>-5</button>
                        <button onClick={() => changeAmount(itemInCart.id, itemInCart.amount - 1, itemInCart.price)} disabled={(itemInCart === undefined) || (itemInCart.amount < 2)}>-1</button>
                        <input style={{width:"4em", textAlign:"center", fontWeight:"bold"}} type='number' value={itemInCart.amount || 0} onChange={(e) => { changeAmount(itemInCart.id, +e.target.value, itemInCart.price) }} min={1}></input>
                        <button onClick={() => changeAmount(itemInCart.id, (itemInCart.amount + 1) || 1, itemInCart.price)} >+1</button>
                        <button onClick={() => changeAmount(itemInCart.id, (itemInCart.amount + 5) || 5, itemInCart.price)} >+5</button>
                        <button onClick={() => changeAmount(itemInCart.id, 0, itemInCart.price)} >Remove</button>
                        </td>
                        <td style={{textAlign:"center"}}>{itemInCart.total}</td></>

                    </tr>)
                })}
            <tr style={{border:"top"}}><td></td><td style={{textAlign:"right"}}>Total: </td><td style={{textAlign:"center"}}>{totalToPay}</td></tr>
            </div>}
            </table> 
            <button onClick={orderFromCart} disabled={cartItems?.length <= 0}>Order</button>
        </div>
    )
}

export default Cart