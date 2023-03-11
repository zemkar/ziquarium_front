import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { showLogin } from '../../auth/actions/loginLogoutShow';

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cartItemAmount } from '../actions/cart';
import { createOrder } from '../actions/order';
import { hideSaleModals } from '../actions/shopModals';
import { formatPrice } from '../service/shopService';

const ToBuyCard = () => {

  let navigate = useNavigate();
  const dispatch: any = useAppDispatch();
  const { user } = useAppSelector(state => state.authReducers.auth)
  const { isSaleDataShow } = useAppSelector(state => state.shopReducer.shopModalReducer); // contain ID of current item

  const { shopItemsData } = useAppSelector(state => state.shopReducer.shopItemsReducer); // price, quantity in stock and etc
  var sellData: any = shopItemsData?.filter((e: any) => { return e.shop_item === isSaleDataShow?.itemId })[0];

  const { cartItems } = useAppSelector(state => state.shopReducer.shopCartReducer); // price, quantity in cart

  var cartItem: any = cartItems?.find((e: any) => {
    // console.log("cartItems?.find", e, isSaleDataShow?.itemId);
    return e?.id === isSaleDataShow?.itemId
  });

  const [totalToPay, setTotalToPay] = useState(0)
  const [amount, setAmount] = useState<number>(cartItem?.amount || 1)

  // common data of item
  const { fishList } = useAppSelector(state => state.fishesReducer.fishes);
  const { plantList } = useAppSelector(state => state.plantsReducer.plants);
  var fishData: any = fishList?.filter((e: any) => { return e?.id === isSaleDataShow?.itemId })[0];
  var plantData: any = plantList?.filter((e: any) => { return e?.id === isSaleDataShow?.itemId })[0];
  var itemData: any = fishData || plantData;

  // console.log("shopItemsData", sellData, shopItemsData, isSaleDataShow, itemData, cartItems);

  const toBuy = () => {
    if (!user) {
      dispatch(showLogin())
    } else {
    var itemToOrder = {
      "product_name": itemData?.name,
      "product": isSaleDataShow?.itemId,
      "quantity": amount,
      "price": sellData?.price,
      "cost": totalToPay
    }
    dispatch(hideSaleModals())
    // console.log("to order: user id", user?.id, " | total to pay", totalToPay, " | items in order: ", [itemToOrder,]);
    dispatch(createOrder({ "buyer": user?.id, "order_items": [itemToOrder,], "total_cost": totalToPay }))
      .then((res: any) => {

        navigate('/order', { state: { order: res.id } });
      }, (err: any) => {
        // console.log(err);
      })}
  }


  const getDiscount = (id: number, amount: number) => {
    var sellData = shopItemsData?.filter((e: any) => { return e.shop_item === id })[0];
    var discount = 0
    if (sellData?.sale_status) { discount = sellData?.sale_discount }
    if (sellData?.quantity_for_discount <= amount) { discount = discount + sellData?.quantity_discount }
    // console.log("new discount", discount);

    return discount
  }

  const toCart = () => {
    if (amount >= 0) {
      dispatch(cartItemAmount(isSaleDataShow?.itemId, amount, sellData?.price, getDiscount(isSaleDataShow?.itemId, amount)))
      dispatch(hideSaleModals())
    }
  }



  const price = useRef<number>(sellData?.price || 0)

  useEffect(() => {
    price.current = sellData?.price
    if (sellData?.sale_status) { price.current = price.current - Math.floor(sellData?.price * sellData?.sale_discount / 100) }
    if (sellData?.quantity_for_discount <= amount) { price.current = price.current - Math.floor(sellData?.price * sellData?.quantity_discount / 100) }
    setTotalToPay(amount * price.current)
  }, [amount, sellData])



  return (
    <div>
      {sellData?.price > 0 ? <>
        <input type='number' value={amount || 1} onChange={(e) => { setAmount(+e.target.value) }} min={0} max={sellData?.quantity}></input> ${formatPrice(totalToPay)}
        {amount > sellData?.quantity && <b style={{ color: "red" }}>&nbsp; &nbsp; This quantity is not available.</b>}
        <br />
        <button className="btn btn-primary btn-sm"
          onClick={() => toCart()}
          disabled={amount <= 0 || amount > sellData?.quantity}>
          Add to cart
        </button> &nbsp;
        <button className="btn btn-primary btn-sm"
          onClick={() => toBuy()}
          disabled={amount <= 0 || amount > sellData?.quantity}>
          Buy now
        </button>
        <hr />
        Price: {formatPrice(sellData?.price)}  &nbsp; &nbsp;  | &nbsp; In stock: {sellData?.quantity}
        <hr />
        {sellData?.quantity_discount > 0 && sellData?.quantity_for_discount > 0 && <>
          Additional {sellData?.quantity_discount}% off ({sellData?.quantity_for_discount} pieces or more)</>}


        {sellData?.sale_status && <>
          <hr />
          SALE: <br />{sellData?.sale_discount ? sellData?.sale_discount : 0}% discount until {sellData?.sale_end_date ? sellData?.sale_end_date : "-"}</>}
      </> : <h3 style={{ textAlign: "center" }}>Sorry, not available</h3>}</div>
  )
}

export default ToBuyCard