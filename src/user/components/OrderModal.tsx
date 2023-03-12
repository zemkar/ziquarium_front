import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { formatPrice } from '../../shop/service/shopService';
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { clearUserOrder, deleteUserOrder } from '../actions/userOrder';

const OrderModal = () => {
    const dispatch: any = useAppDispatch();
    const { order } = useAppSelector((state) => state.userProfileReducers.userOrderReducer);
    const { userOrders, userPayments } = useAppSelector(state => state.shopReducer.userOrdersReducer);
    const [showOrder, setShowOrder] = useState(false)

    var orderToShow:any = userOrders?.filter((e:any) => {return e.id===order})[0];
    var paymentToShow:any = userPayments?.filter((e:any) => {return e.order===order})[0];
    if (paymentToShow?.status === "C") {paymentToShow = "Complete"}
    else if (paymentToShow?.status === "P") {paymentToShow = "Pending"}
    else if (paymentToShow?.status === "F") {paymentToShow = "Fail"}

    // console.log("orderToShow:", orderToShow, "\n paymentToShow", paymentToShow);
    
    useEffect(() => {
        if (order){ 
            setShowOrder(true);
        }
    }, [order, showOrder])
    
    useEffect(() => {
        if (!showOrder){ 
            dispatch(clearUserOrder());
            setShowOrder(false);
        }
    }, [dispatch, showOrder])

    const deleteOrder = () => {
        dispatch(deleteUserOrder(order))
        dispatch(clearUserOrder());
        setShowOrder(false);
    }
    
  return (
    <div>
        
    <Modal show={showOrder}
                onHide={() => setShowOrder(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-detail"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-detail">
                        <strong> {order} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {order} | <button disabled={paymentToShow === "Complete"} onClick={()=>deleteOrder()}>Delete</button>
                    <hr />
                    billing_address: {orderToShow?.billing_address ? orderToShow.billing_address : "---"}<br/>
                    shipping_address: {orderToShow?.shipping_address ? orderToShow?.shipping_address : "---"}<br/>
                    status: {orderToShow?.status === "C" ? "Complite" : "Pending"}<br/>
                    total_cost: {formatPrice(orderToShow?.total_cost)}<br/>
                    <hr/>
                    payment status: {paymentToShow}<br/>
                    <hr />
                    order items: <br />
                    {orderToShow?.order_items?.map((item:any) => <p key={item.id}>{item?.product_name || "***"} | {item?.quantity} pts. -  {formatPrice(item?.cost)}</p>)}

                </Modal.Body>
            </Modal>

        
    </div>
  )
}

export default OrderModal