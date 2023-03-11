import React, { useState } from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from 'react-bootstrap/Modal';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import ProfileCard from './ProfileCard';
import ProfileForm from './ProfileForm';
import DeleteForm from './DeleteForm';
import { hideFishModals, showFishDelete, showFishEdit, showFishProfile, showInTankAmount } from '../../actions/fishModals';
import ChangeAmount from './ChangeAmount';
import Z_URL from '../../../service/constants';
import ToBuyCard from '../../../shop/components/ToBuyCard';

import { hideSaleModals, showToBuyCard, showSaleEditor } from '../../../shop/actions/shopModals';
import SaleEditor from '../../../shop/components/SaleEditor';
import { formatPrice } from '../../../shop/service/shopService';


const FishCard = ({ fish }: any) => {
    const dispatch: any = useAppDispatch();

    const { isDeleteShow, isEditShow, isProfileShow, isInTankAmountShow } = useAppSelector(state => state.fishesReducer.fishModals);
    const { user: currentUser } = useAppSelector(state => state.authReducers.auth)
    const { isSaleDataShow, isSaleEditorShow } = useAppSelector(state => state.shopReducer.shopModalReducer);
    const { shopItemsData } = useAppSelector(state => state.shopReducer.shopItemsReducer);
    const saleData = shopItemsData?.filter((e: any) => { return e.shop_item === fish.id })[0]
    // console.log("sale data:", fish.id, saleData);


    const [loading, setLoading] = useState<boolean>(false);

    const showProfile = (isEdit: boolean, isShow: boolean) => {
        // if isEdit = true - open form to edit fish profile
        // else - open fish profile for reading

        if (isShow) {
            setLoading(true);
            if (isEdit) dispatch(showFishEdit(fish.id))
            else dispatch(showFishProfile(fish.id));
            setLoading(false);
        } else dispatch(hideFishModals())
    }

    const goToFullProfile = () => { console.log("goToFullProfile WIP"); }

    const toChangeAmount = (status: boolean) => {
        setLoading(false);
        if (status) dispatch(showInTankAmount(fish.id))
        else dispatch(hideFishModals());
    }

    const toSaleData = (status: boolean) => {
        if (status) dispatch(showToBuyCard(fish.id))
        else dispatch(hideSaleModals());
    }

    const toSaleEditor = (status: boolean) => {
        if (status) dispatch(showSaleEditor(fish.id))
        else dispatch(hideSaleModals());
    }


    const deleteFishShow = (status: boolean) => {
        setLoading(false);
        if (status) dispatch(showFishDelete(fish.id))
        else dispatch(hideFishModals());
    }

    return (
        <>
            <OverlayTrigger overlay={<Tooltip id="tooltip-detail">Click for detail</Tooltip>}>
                <Card style={{ width: '14rem', margin: "0.5rem" }} key={fish.id}>

                    <Card.Img
                        variant="top"
                        src={Z_URL.SERVER + (fish?.image || "/media/SomeFish.png")}
                        width='100%'
                        onClick={() => showProfile(false, true)}
                    />

                    <ListGroup className="list-group-flush">
                        {!fish?.approved && <>Pending approval<img height="20" width="20" src='icons/visibility_off.svg' alt='' /></>}
                        {fish.id && fish.id > 0 ? (
                            <ListGroup.Item onClick={() => { if (fish.id && fish.id > 0) showProfile(false, true) }}>
                            <strong> {fish?.name} </strong> {fish?.fish_value > 0 && <><br /> ({fish?.fish_value} pts)</>}<br />
                                {fish?.scientific_name}

                                <ListGroup className='d-grid gap-1'>
                            {saleData?.price && saleData.price > 0 ? 
                                <div className='price-block'>
                                    <div style={{color: saleData?.sale_status ? "red" : "black"}}> ${formatPrice(saleData?.price)} {saleData?.sale_status && <sup>-{saleData?.sale_discount}%</sup>}</div>  
                                    <div>| In stock: {saleData?.quantity}</div>
                                </div> : "Not in sell"}
                        </ListGroup>

                            </ListGroup.Item>) : <strong> {fish?.name} </strong>}

                        {fish?.id !== 0 && <ListGroup.Item>
                            <div className="d-grid gap-1">

                                <button className="btn btn-outline-primary btn-sm"
                                    onClick={() => toChangeAmount(true)}>
                                    Add to tank
                                </button>

                                <div className="btn-group">
                                    <button className="btn btn-outline-primary btn-sm"
                                        onClick={() => toSaleData(true)} disabled={saleData?.price && saleData.price <= 0}>
                                        To buy
                                    </button>{currentUser && currentUser.admin &&
                                        <button className="btn btn-outline-success btn-sm"
                                            onClick={() => toSaleEditor(true)}>
                                            Edit
                                        </button>}
                                </div>
{/* 
                                <button className="btn btn-outline-primary btn-sm"
                                    onClick={goToFullProfile}>
                                    Fish page (WIP)
                                </button> */}

                                {currentUser && currentUser.editor &&
                                    <div className="btn-group">
                                        <button className="btn btn-outline-success btn-sm"
                                            onClick={() => showProfile(true, true)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm"
                                            onClick={() => deleteFishShow(true)}>
                                            Delete
                                        </button>

                                    </div>
                                }
                            </div>
                        </ListGroup.Item>}

                    </ListGroup>

                </Card>
            </OverlayTrigger>

            {/* ********************************************************************************** */}
            {/* ********************************** END CARD ************************************** */}
            {/* ********************************************************************************** */}



            {/* ********************************************************************************** */}
            {/* ******************************* DETAILS OF FISH ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isProfileShow.fishId === fish.id && isProfileShow.status}
                onHide={() => showProfile(false, false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-detail"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-detail">
                        {loading && <span className="spinner-border spinner-border-sm" />}<strong> {fish?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {!loading && <><ProfileCard /></>}

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* *************************** END DETAILS OF FISH ********************************** */}
            {/* ********************************************************************************** */}



            {/* ********************************************************************************** */}
            {/* *************************** EDIT DETAILS OF FISH ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isEditShow.fishId === fish.id && isEditShow.status}
                onHide={() => showProfile(false, false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-editor"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-editor">
                        <strong> {fish?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? <span className="spinner-border spinner-border-sm"></span> : <ProfileForm />}

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* *********************** END EDIT DETAILS OF FISH ********************************** */}
            {/* ********************************************************************************** */}


            {/* ********************************************************************************** */}
            {/* *********************************** DELETE FISH ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isDeleteShow.fishId === fish.id && isDeleteShow.status}
                onHide={() => deleteFishShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-delete"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-delete">
                        <strong> {fish?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ?
                        <span className="spinner-border spinner-border-sm"></span>
                        : <DeleteForm id={fish?.id} />
                    }

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* ******************************* END DELETE FISH ********************************** */}
            {/* ********************************************************************************** */}


            {/* ********************************************************************************** */}
            {/* *********************************** AMOUNT FISHES IN THE TANK ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isInTankAmountShow.fishId === fish.id && isInTankAmountShow.status}
                onHide={() => toChangeAmount(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-amount"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-amount">
                        <strong> {fish?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ?
                        <span className="spinner-border spinner-border-sm"></span>
                        : <ChangeAmount />
                    }

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* ******************************* END DELETE FISH ********************************** */}
            {/* ********************************************************************************** */}



            {/* ********************************************************************************** */}
            {/* *********************************** SALE DATA ************************************ */}
            {/* ********************************************************************************** */}

            <Modal show={isSaleDataShow.itemId === fish.id && isSaleDataShow.status}
                onHide={() => toSaleData(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-amount"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-amount">
                        <strong> {fish?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ?
                        <span className="spinner-border spinner-border-sm"></span>
                        : <ToBuyCard />
                    }

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* ******************************* END  SALE DATA  ********************************** */}
            {/* ********************************************************************************** */}



            {/* ********************************************************************************** */}
            {/* *********************************** SALE EDITOR ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isSaleEditorShow.itemId === fish.id && isSaleEditorShow.status}
                onHide={() => toSaleEditor(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-amount"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-amount">
                        <strong> {fish?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ?
                        <span className="spinner-border spinner-border-sm"></span>
                        : <SaleEditor />
                    }

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* ******************************* END  SALE EDITOR ********************************* */}
            {/* ********************************************************************************** */}
        </>
    )
}

export default FishCard