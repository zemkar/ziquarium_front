import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import Checkout from './Checkout';
import { createPayment } from '../actions/payment';
import { formatPrice } from '../service/shopService';

const Order = () => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const { state } = useLocation()
  const dispatch: any = useAppDispatch();
  const { orderData } = useAppSelector(state => state.shopReducer.orderReducer);

  const { plantList } = useAppSelector(state => state.plantsReducer.plants); // plants in DB
  const { fishList } = useAppSelector(state => state.fishesReducer.fishes); // fish in DB
  const total = useRef<number>(0);

  // console.log(state, orderData);
  
  if (!loaded && state?.order) {
    // console.log("state?.order", state?.order);
    
    dispatch(createPayment(state?.order))
      .then((res: any) => {
        // console.log("res", res)
        setLoaded(true)
      }, (err: any) => {
        // console.error("res", err)
        setLoaded(true)
      })
  }


  const getItemName = (id: number) => {
    var fishData: any = fishList?.filter((e: any) => { return e?.id === id })[0];
    var plantData: any = plantList?.filter((e: any) => { return e?.id === id })[0];
    var itemData: any = fishData || plantData;
    return itemData?.name
  }

  total.current = 0;
  return (
    <div>Order<br />

      <table style={{ width: "90%" }}>
        <tbody>
          {orderData?.data?.order_items && <>
            <tr><td style={{ width: "40%" }}></td><td style={{ width: "19em", textAlign: "right" }}></td></tr>
              <tr><td>&nbsp;</td></tr>
              {orderData?.data?.order_items && orderData.data.order_items.map((orderItem: any) => {
                total.current = total.current + orderItem.cost
                return (
                <tr key={orderItem.id}>
                  <td>{orderItem.id + ") " + getItemName(orderItem?.product)}</td>
                  <td style={{ textAlign: "center" }}>{"" + orderItem.quantity + " pts."}</td>
                  <td style={{ textAlign: "center" }}>${formatPrice(orderItem.cost)}</td>
                </tr>
                )
              })}
              <tr style={{ border: "top" }}><td></td><td style={{ textAlign: "right" }}>Total: </td><td style={{ textAlign: "center" }}>${formatPrice(total.current)}</td></tr>
            </ >}
            </tbody>
          </table>
      {state?.order && <Checkout />}
    </div>
        )
}

        export default Order