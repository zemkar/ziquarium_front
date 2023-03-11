import React from 'react'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getShopData, modShopData } from '../actions/shop';
import { hideSaleModals } from '../actions/shopModals';

const SaleEditor = () => {
    const dispatch: any = useAppDispatch();
    const { isSaleEditorShow } = useAppSelector(state => state.shopReducer.shopModalReducer); // contain ID of current item

    const { shopItemsData } = useAppSelector(state => state.shopReducer.shopItemsReducer); // price, quantity in stock and etc
    var sellData: any = shopItemsData?.filter((e: any) => { return e.shop_item === isSaleEditorShow?.itemId })[0];

    // console.log("SaleEditor", sellData);

    const validationSchema = Yup.object().shape({});
    const {
        register,
        handleSubmit,
        // formState: { errors }
    } = useForm<any>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: any) => {
        data["shop_item"] = isSaleEditorShow?.itemId
        // console.log("data to mod", data);
        dispatch(modShopData(data))
            .then(
                (res: any) => {
                    dispatch(getShopData());
                },
                (err: any) => { 
                    // console.log("modShopData Error:", err); 
                }
            )
            .finally(()=>{dispatch(hideSaleModals())})
    }

    return (
        <div>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row><Col>Price:</Col><Col><Form.Control type='number' id='price' {...register('price')} defaultValue={sellData?.price} size="sm" /></Col></Row>

                <Row><Col>Quantity:</Col><Col><Form.Control type='number' id='quantity' {...register('quantity')} defaultValue={sellData?.quantity} size="sm" /></Col></Row>

                <Row><Col>Discount for quantity:</Col><Col><Form.Control type='number' id='quantity_discount' {...register('quantity_discount')} defaultValue={sellData?.quantity_discount} size="sm" /></Col></Row>

                <Row><Col>Quantity for discount:</Col><Col><Form.Control type='number' id='quantity_for_discount' {...register('quantity_for_discount')} defaultValue={sellData?.quantity_for_discount} size="sm" /></Col></Row>

                <Row><Col>Sale discount:</Col><Col><Form.Control type='number' id='sale_discount' {...register('sale_discount')} defaultValue={sellData?.sale_discount} size="sm" /></Col></Row>

                <Row><Col>Sale end date:</Col><Col><Form.Control type="date" id='sale_end_date' {...register('sale_end_date')} defaultValue={sellData?.sale_end_date} size="sm" /></Col></Row>

                <Row><Col>Sale status:</Col><Col><Form.Check type="switch" id='sale_status' {...register('sale_status')} defaultChecked={sellData?.sale_status} /></Col></Row>

                <Button variant="primary" type="submit" >
                    Save
                </Button>
            </Form>
        </div>
    )
}

export default SaleEditor