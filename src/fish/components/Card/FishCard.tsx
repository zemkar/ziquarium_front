import React, { useState } from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from 'react-bootstrap/Modal';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFishProfile } from '../../actions/fishes';
import ProfileCard from './ProfileCard';
import ProfileForm from './ProfileForm';
import DeleteForm from './DeleteForm';
import { hideFishModals, showFishDelete, showFishEdit, showFishProfile, showInTankAmount } from '../../actions/fishModals';
import ChangeAmount from './ChangeAmount';


const FishCard = ({ fish }: any) => {
    const dispatch: any = useAppDispatch();

    const { fishData } = useAppSelector(state => state.fishesReducer.profile);
    const { fishes_data } = useAppSelector(state => state.fishesReducer.fishesData);
    const { isDeleteShow, isEditShow, isProfileShow, isInTankAmountShow } = useAppSelector(state => state.fishesReducer.fishModals);
    const { user: currentUser } = useAppSelector(state => state.authReducers.auth)

    const [loading, setLoading] = useState<boolean>(false);

    var data:any = fishes_data?.filter((e:any) => {return e.fish === fish.id})[0];
    
    
    
    
    const showProfile = (isEdit: boolean, isShow: boolean) => {
        // if isEdit = true - open form to edit fish profile
        // else - open fish profile for reading

        if (isShow) {
            setLoading(true);
            if (isEdit) dispatch(showFishEdit(fish.id))
            else dispatch(showFishProfile(fish.id));

            if (!fishData || fishData.id !== fish.id) {
                dispatch(getFishProfile(fish.id))
                    .then(
                        (res: any) => {console.log("Fish profile loaded: \n", res)}, 
                        (error: any) => {console.log("Fish profile Error: \n", error)}
                        )
                    .finally(() => {setLoading(false)});
            } else {
                setLoading(false);
            }
        } else dispatch(hideFishModals())
    }

    const goToFullProfile = () => { console.log("goToFullProfile WIP"); }

    const toChangeAmount = (status: boolean) => {
        setLoading(false);
        if (status) dispatch(showInTankAmount(fish.id))
        else dispatch(hideFishModals());
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
                        src={fish?.image || "/media/SomeFish.png"}
                        width='100%'
                        onClick={() => showProfile(false, true)}
                    />

                    <ListGroup className="list-group-flush">
                        <ListGroup.Item onClick={() => showProfile(false, true)}>
                            <strong> {fish?.name} </strong> ({data?.fish_value | 0}) pts/fish<br />
                            {fish?.scientific_name || "___"}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <div className="d-grid gap-1">

                                <button className="btn btn-outline-primary btn-sm"
                                    onClick={() => toChangeAmount(true)}>
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
        </>
    )
}

export default FishCard