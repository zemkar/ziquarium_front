import React, { useEffect, useState } from 'react'
import { getOrders } from '../../shop/actions/userOrders';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserOrder } from '../actions/userOrder';
import OrderModal from './OrderModal';

const UserOrders = () => {

    const dispatch: any = useAppDispatch()
    const { userOrders } = useAppSelector(state => state.shopReducer.userOrdersReducer);
    const { order } = useAppSelector((state) => state.userProfileReducers.userOrderReducer);
    // console.log("payments:",userPayments, "\n orders:", userOrders);

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!order) {
            
            dispatch(getOrders())
        }
    }, [order, dispatch])
    
    // Load user orders
    useEffect(() => {
        if (!userOrders || userOrders.length < 1) {
            setLoading(true)

            dispatch(getOrders())
                .then((res: any) => { },
                    (err: any) => {
                         // console.error("Get orders:", err) 
                }
                )
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [dispatch, userOrders])

    const showOrder = (id: number) => {
        dispatch(getUserOrder(id))
    }


    return (
        <div className="card card-container" style={{ backgroundColor: "blanchedalmond" }}>
            Orders
            {userOrders?.map((order: any, i: number) => {
                return (
                <div 
                    className={"order-status-" + order.status} 
                    key={i} 
                    style={{cursor:"pointer"}} 
                    onClick={() => showOrder(order.id)}
                    >
                        #{order.id} 
                    </div>);
            })}
            {loading && (
                <><span className="spinner-border spinner-border-sm"></span></>
            )}
            <OrderModal />
        </div>
    )
}

export default UserOrders