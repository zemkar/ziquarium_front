import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getFishes } from '../../fish/actions/fishes';
import { getPlants } from '../../plants/actions/plants';
import { cartItemAmount, clearCart, restoreCart } from '../actions/cart';
import { itemInCart } from '../interfaces';
import { createOrder } from '../actions/order';
import { formatPrice } from '../service/shopService';
import { showLogin } from '../../auth/actions/loginLogoutShow';

const Cart = () => {

    const loaded = useRef<boolean>(false);
    let navigate = useNavigate();
    const dispatch: any = useAppDispatch();
    const { cartItems } = useAppSelector(state => state.shopReducer.shopCartReducer); // selected items
    const { user } = useAppSelector(state => state.authReducers.auth)

    const { shopItemsData } = useAppSelector(state => state.shopReducer.shopItemsReducer); // price, quantity in stock and etc

    const { plantList } = useAppSelector(state => state.plantsReducer.plants); // plants in DB
    const { fishList } = useAppSelector(state => state.fishesReducer.fishes); // fish in DB
    
    if (!loaded.current) {
        if (!fishList) {
            dispatch(getFishes())
        }
        if (!plantList) {
            dispatch(getPlants())
        }


        if (cartItems?.length <= 0) {
            var storedItems: any = localStorage.getItem("cartItems")
            if (storedItems) dispatch(restoreCart())
        }

        loaded.current = true
    }

    const totalToPay = useRef<number>(0);

    const calculateTotal = useCallback(() => {
        totalToPay.current = 0
        cartItems.map((e: any) => {            
            totalToPay.current = totalToPay.current + e?.total;
            return null;
        })
    }, [cartItems])

    useEffect(() => {
        calculateTotal()
    }, [cartItems, calculateTotal])


    const changeAmount = (id: number, amount: number, price: number) => {
        // console.log("changeAmount", id, amount);
        if (id && (amount || amount === 0)) {
            if (amount >= 0) {
                dispatch(cartItemAmount(id, amount, price, getDiscount(id, amount)))
                calculateTotal()
            }
        }
    }

    const removeCartItems = () => {
        totalToPay.current = 0
        dispatch(clearCart())
    }

    const getItemName = (id: number) => {
        var fishData: any = fishList?.filter((e: any) => { return e?.id === id })[0];
        var plantData: any = plantList?.filter((e: any) => { return e?.id === id })[0];
        var itemData: any = fishData || plantData;
        return itemData?.name
    }

    const getDiscount = (id: number, amount: number) => {
        var sellData = shopItemsData?.filter((e: any) => { return e.shop_item === id })[0];
        var discount = 0
        if (sellData?.sale_status) { discount = sellData?.sale_discount }
        if (sellData?.quantity_for_discount <= amount) { discount = discount + sellData?.quantity_discount }
        // console.log("new discount", discount);

        return discount
    }

    const orderFromCart = () => {
        if (!user) {
          dispatch(showLogin())
        } else {
        const orderItems = cartItems.map((e: any) => {
            var itemToOrder = {
                "name": getItemName(e.id),
                "product": e.id,
                "quantity": e.amount,
                "price": e.price,
                "cost": e.total
            }
            return itemToOrder
        })
        // console.log("to order: user id", user.id, " | total to pay", totalToPay.current, " | items in order: ", orderItems);
        dispatch(createOrder({ "buyer": user.id, "order_items": orderItems, "total_cost": totalToPay.current }))
            .then((res: any) => {

                navigate('/order', { state: { order: res.id } });
                dispatch(clearCart())
            }, (err: any) => {
                // console.log(err);
            })
        }
    }


    return (
        <div style={{ padding: "3%" }}>
            <table style={{ width: "90%" }}>
                <tbody>
                {cartItems && <  ><tr><td style={{ width: "40%" }}></td><td style={{ width: "19em", textAlign: "right" }}>
                    {cartItems?.length > 0 ? <button onClick={removeCartItems} >Remove all items</button> : "Cart is empty"}</td><td style={{ width: "10%", minWidth: "6em" }}></td></tr>
                    <tr><td>&nbsp;</td></tr>
                    {cartItems && cartItems.map((itemInCart: itemInCart) => {
                        return (<tr key={itemInCart.id}><>
                            <td>
                                {itemInCart.id + ") " + getItemName(itemInCart?.id) + " " + itemInCart.amount + " pts. * $" + formatPrice(itemInCart.price)}
                            </td><td style={{ textAlign: "center" }}>
                                <button onClick={() => changeAmount(itemInCart.id, itemInCart.amount - 5, itemInCart.price)} disabled={(itemInCart === undefined) || (itemInCart.amount < 6)}>-5</button>
                                <button onClick={() => changeAmount(itemInCart.id, itemInCart.amount - 1, itemInCart.price)} disabled={(itemInCart === undefined) || (itemInCart.amount < 2)}>-1</button>
                                <input style={{ width: "4em", textAlign: "center", fontWeight: "bold" }} type='number' value={itemInCart.amount || 0} onChange={(e) => { changeAmount(itemInCart.id, +e.target.value, itemInCart.price) }} min={1}></input>
                                <button onClick={() => changeAmount(itemInCart.id, (itemInCart.amount + 1) || 1, itemInCart.price)} >+1</button>
                                <button onClick={() => changeAmount(itemInCart.id, (itemInCart.amount + 5) || 5, itemInCart.price)} >+5</button>
                                <button onClick={() => changeAmount(itemInCart.id, 0, itemInCart.price)} >Remove</button>
                            </td>
                            <td style={{ textAlign: "center" }}>${formatPrice(itemInCart.total)}</td></>

                        </tr>)
                    })}
                    <tr style={{ border: "top" }}><td></td><td style={{ textAlign: "right" }}>Total: </td><td style={{ textAlign: "center" }}>${formatPrice(totalToPay.current)}</td></tr>
                </ >}</tbody>
            </table>
            <button onClick={orderFromCart} disabled={cartItems?.length <= 0}>Order</button>
        </div>
    )
}

export default Cart