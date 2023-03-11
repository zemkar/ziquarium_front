import React, { useState } from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from 'react-bootstrap/Modal';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import ProfileCard from './ProfileCard';
import DeleteForm from './DeleteForm';
import ProfileForm from './ProfileForm';
import { hidePlantModals, showPlantDelete, showPlantEdit, showPlantProfile, showInTankAmount } from '../../actions/plantsModals';
import ChangeAmount from './ChangeAmount';
import Z_URL from '../../../service/constants';
import ToBuyCard from '../../../shop/components/ToBuyCard';
import { hideSaleModals, showToBuyCard, showSaleEditor } from '../../../shop/actions/shopModals';
import SaleEditor from '../../../shop/components/SaleEditor';
import { formatPrice } from '../../../shop/service/shopService';


const PlantCard = ({ plant }: any) => {
    const dispatch: any = useAppDispatch();

    const { isDeleteShow, isEditShow, isProfileShow, isInTankAmountShow } = useAppSelector(state => state.plantsReducer.plantModals);
    const { user: currentUser } = useAppSelector(state => state.authReducers.auth);
    const { isSaleDataShow, isSaleEditorShow } = useAppSelector(state => state.shopReducer.shopModalReducer);
    const { shopItemsData } = useAppSelector(state => state.shopReducer.shopItemsReducer);
    const saleData = shopItemsData?.filter((e: any) => { return e.shop_item === plant.id })[0]

    const [loading, setLoading] = useState<boolean>(false);

    const showProfile = (isEdit: boolean, isShow: boolean) => {
        // if isEdit = true - open form to edit plant profile
        // else - open plant profile for reading

        if (isShow) {
            setLoading(true);
            if (isEdit) dispatch(showPlantEdit(plant.id))
            else dispatch(showPlantProfile(plant.id));
            setLoading(false);
        } else dispatch(hidePlantModals())
    }

    // const goToFullProfile = () => { console.log("goToFullProfile WIP"); }

    const toChangeAmount = (status: boolean) => {
        setLoading(false);
        if (status) dispatch(showInTankAmount(plant.id))
        else dispatch(hidePlantModals());
    }

    const toSaleData = (status: boolean) => {

        if (status) dispatch(showToBuyCard(plant.id))
        else dispatch(hideSaleModals());
    }

    const toSaleEditor = (status: boolean) => {
        if (status) dispatch(showSaleEditor(plant.id))
        else dispatch(hideSaleModals());
    }

    const deletePlantShow = (status: boolean) => {
        setLoading(false);
        if (status) dispatch(showPlantDelete(plant.id))
        else dispatch(hidePlantModals());
    }

    return (
        <>
            <OverlayTrigger overlay={<Tooltip id="tooltip-detail">{plant.id && plant.id > 0 && "Click for detail"}</Tooltip>}>
                <Card style={{ width: '14rem', margin: "0.5rem" }} key={plant.id}>

                    <Card.Img
                        variant="top"
                        src={Z_URL.SERVER + plant?.image || Z_URL.SERVER + "/media/SomePlant.png"}
                        width='100%'
                        onClick={() => { if (plant.id && plant.id > 0) showProfile(false, true) }}
                    />

                    <ListGroup className="list-group-flush">
                        {!plant?.approved && <>Pending approval<img height="20" width="20" src='icons/visibility_off.svg' alt='' /></>}
                        {plant.id && plant.id > 0 ? (
                            <ListGroup.Item onClick={() => { if (plant.id && plant.id > 0) showProfile(false, true) }}>
                                <strong> {plant?.name} </strong> {plant?.plant_value > 0 && <><br /> ({plant?.plant_value} pts)</>}<br />
                                {plant?.scientific_name}

                                <ListGroup className='d-grid gap-1'>
                            {saleData?.price && saleData.price > 0 ? 
                                <div className='price-block'>
                                    <div style={{color: saleData?.sale_status ? "red" : "black"}}> ${formatPrice(saleData?.price)} {saleData?.sale_status && <sup>-{saleData?.sale_discount}%</sup>}</div>  
                                    <div>| In stock: {saleData?.quantity}</div>
                                </div> : "Not in sell"}
                        </ListGroup>

                            </ListGroup.Item>) : <strong> {plant?.name} </strong>}
                        {plant.id && plant.id > 0 &&
                            <ListGroup.Item>
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
                                        Plant page (WIP)
                                    </button> */}

                                    {currentUser && currentUser.editor && currentUser.admin &&
                                        <div className="btn-group">
                                            <button className="btn btn-outline-success btn-sm"
                                                onClick={() => showProfile(true, true)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm"
                                                onClick={() => deletePlantShow(true)}>
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
            {/* ******************************* DETAILS OF PLANT ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isProfileShow.plantId === plant.id && isProfileShow.status}
                onHide={() => showProfile(false, false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-detail"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-detail">
                        {loading && <span className="spinner-border spinner-border-sm" />}<strong> {plant?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {!loading && <><ProfileCard /></>}

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* *************************** END DETAILS OF PLANT ********************************** */}
            {/* ********************************************************************************** */}



            {/* ********************************************************************************** */}
            {/* *************************** EDIT DETAILS OF PLANT ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isEditShow.plantId === plant.id && isEditShow.status}
                onHide={() => showProfile(false, false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-editor"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-editor">
                        <strong> {plant?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? <span className="spinner-border spinner-border-sm"></span> : <ProfileForm />}

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* *********************** END EDIT DETAILS OF PLANT ********************************** */}
            {/* ********************************************************************************** */}


            {/* ********************************************************************************** */}
            {/* *********************************** DELETE PLANT ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isDeleteShow.plantId === plant.id && isDeleteShow.status}
                onHide={() => deletePlantShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-delete"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-delete">
                        <strong> {plant?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ?
                        <span className="spinner-border spinner-border-sm"></span>
                        : <DeleteForm id={plant?.id} />
                    }

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* ******************************* END DELETE PLANT ********************************* */}
            {/* ********************************************************************************** */}


            {/* ********************************************************************************** */}
            {/* *********************************** AMOUNT PLANTS IN THE TANK ******************** */}
            {/* ********************************************************************************** */}

            <Modal show={isInTankAmountShow.plantId === plant.id && isInTankAmountShow.status}
                onHide={() => toChangeAmount(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-amount"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-amount">
                        <strong> {plant?.name} </strong>
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
            {/* ******************************* END DELETE PLANT ********************************** */}
            {/* ********************************************************************************** */}



            {/* ********************************************************************************** */}
            {/* *********************************** SALE DATA ************************************ */}
            {/* ********************************************************************************** */}

            <Modal show={isSaleDataShow.itemId === plant.id && isSaleDataShow.status}
                onHide={() => toSaleData(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-amount"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-amount">
                        <strong> {plant?.name} </strong>
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

            <Modal show={isSaleEditorShow.itemId === plant.id && isSaleEditorShow.status}
                onHide={() => toSaleEditor(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-amount"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-amount">
                        <strong> {plant?.name} </strong>
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

export default PlantCard