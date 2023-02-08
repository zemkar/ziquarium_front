import React, { useState } from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from 'react-bootstrap/Modal';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFishProfile } from '../../actions/fishes';
import DetailCard from './ProfileCard';
import DetailForm from './ProfileForm';
import DeleteForm from './DeleteForm';
import { hideFishModals, showFishDelete, showFishEdit, showFishProfile, showInTankAmount } from '../../actions/fishModals';


const FishCard = ({ fish }: any) => {
    const dispatch: any = useAppDispatch();

    const { fishData } = useAppSelector(state => state.fishesReducer.profile);
    const { isDeleteShow, isEditShow, isProfileShow, isInTankAmountShow } = useAppSelector(state => state.fishesReducer.fishModals);
    const { user: currentUser } = useAppSelector(state => state.authReducers.auth)



    const [loading, setLoading] = useState<boolean>(false);

    const showProfile = (isEdit: boolean, isShow: boolean) => {
        // if isEdit = true - open form to edit fish profile
        // else - open fish profile for reading

        if (isShow) {
            setLoading(true);
            console.log("loading ON - showProfile");
            if (isEdit) dispatch(showFishEdit())
            else dispatch(showFishProfile());

            if (!fishData || fishData.id !== fish.id) {
                dispatch(getFishProfile(fish.id))
                    .then((res: any) => {
                        console.log("Fish profile loaded: \n", res);
                    }, (error: any) => {
                        console.log("Fish profile Error: \n", error);
                    })
                    .finally(() => {
                        setLoading(false);
                        console.log("loading OFF - showProfile fishData");
                    });
            } else {
                setLoading(false);
                console.log("loading OFF - showProfile !fishData");
                console.log("data stored");
            }

        } else dispatch(hideFishModals())
    }

    const goToFullProfile = () => { console.log("goToFullProfile WIP"); }

    const changeAmount = (status: boolean) => {
        setLoading(false);
        console.log("loading OFF - changeAmount");
        if (status) dispatch(showInTankAmount())
        else dispatch(hideFishModals());
    }


    const deleteFishShow = (status: boolean) => {
        setLoading(false);
        console.log("loading OFF - deleteFishShow");
        if (status) dispatch(showFishDelete())
        else dispatch(hideFishModals());
    }




    return (
        <>
            <OverlayTrigger overlay={<Tooltip id="tooltip-detail">Click for detail</Tooltip>}>
                <Card style={{ width: '14rem', margin: "0.5rem" }} key={fish.id}>

                    <Card.Img
                        variant="top"
                        src={fish?.image || "/media/SomeFish.png"}
                        width='100%'
                        onClick={() => showProfile(false, true)}
                    />

                    <ListGroup className="list-group-flush">
                        <ListGroup.Item onClick={() => showProfile(false, true)}>
                            <strong> {fish?.name} </strong> {fishData?.fish_value} pts/fish<br />
                            {fish?.scientific_name || "___"}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <div className="d-grid gap-1">

                                <button className="btn btn-outline-primary btn-sm"
                                    onClick={() => changeAmount(true)}>
                                    Add/remove fish
                                </button>
                                <button className="btn btn-outline-primary btn-sm"
                                    onClick={goToFullProfile}>
                                    Fish page
                                </button>

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
                        </ListGroup.Item>

                    </ListGroup>

                </Card>
            </OverlayTrigger>

            {/* ********************************************************************************** */}
            {/* ********************************** END CARD ************************************** */}
            {/* ********************************************************************************** */}



            {/* ********************************************************************************** */}
            {/* ******************************* DETAILS OF FISH ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isProfileShow}
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
                    
                    {!loading && <>При загрузке оно почему-то не прячется...<DetailCard /></>}

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* *************************** END DETAILS OF FISH ********************************** */}
            {/* ********************************************************************************** */}



            {/* ********************************************************************************** */}
            {/* *************************** EDIT DETAILS OF FISH ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isEditShow}
                onHide={() => showProfile(false, false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-detail"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-detail">
                        <strong> {fish?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? <span className="spinner-border spinner-border-sm"></span> : <DetailForm />}

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* *********************** END EDIT DETAILS OF FISH ********************************** */}
            {/* ********************************************************************************** */}


            {/* ********************************************************************************** */}
            {/* *********************************** DELETE FISH ********************************** */}
            {/* ********************************************************************************** */}

            <Modal show={isDeleteShow}
                onHide={() => deleteFishShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-detail"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-detail">
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

            <Modal show={isInTankAmountShow}
                onHide={() => changeAmount(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-detail"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-detail">
                        <strong> {fish?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ?
                        <span className="spinner-border spinner-border-sm"></span>
                        : "WIP change amount in the tank"
                    }

                </Modal.Body>
            </Modal>

            {/* ********************************************************************************** */}
            {/* ******************************* END DELETE FISH ********************************** */}
            {/* ********************************************************************************** */}
        </>
    )
}

export default FishCard