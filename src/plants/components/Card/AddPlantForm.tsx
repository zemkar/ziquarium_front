import React, { useState } from 'react'

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Z_URL from "../../../service/constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { plantCategory } from '../../interfaces';
import AddCategory from './AddCategory';
import { addPlant, getPlants } from '../../actions/plants';
import { hideAddCategoryWindow, hidePlantModals, showAddCategoryWindow, showPlantAdd, showPlantEdit } from '../../actions/plantsModals';
import ProfileForm from './ProfileForm';

const AddPlantForm = () => {


    const dispatch: any = useAppDispatch();
    const { plantsCategories } = useAppSelector(state => state.plantsReducer.plantsCategories);
    const { isAddShow } = useAppSelector(state => state.plantsReducer.plantModals);
    const { status:showAddCategory } = useAppSelector(state => state.plantsReducer.plantsAddCategoryReducer);

    const [editDetailShow, setEditDetailShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [successful, setSuccessful] = useState<boolean>(false);


    const MAX_FILE_SIZE = 6000000;
    const getExtension = (filename: string) => {
        if (filename) return filename.split('.').pop() || "";
        return "";
    }


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(20, 'Name must not exceed 30 characters'),
        scientific_name: Yup.string()
            .max(50, 'Scientific name must not exceed 50 characters'),
        category: Yup.number(),
        file: Yup.mixed()
            .test({
                message: 'Please provide a supported file type',
                test: (file, context) => {
                    const isValid = ['png', 'jpg', 'jpeg', 'gif'].includes(getExtension(file?.name));
                    if (!file) return true;
                    if (!isValid) context?.createError();
                    return isValid;
                }
            })
            .test({
                message: `File too big, can't exceed ${MAX_FILE_SIZE}`,
                test: (file) => {
                    if (!file) return true;
                    const isValid = file?.size < MAX_FILE_SIZE;
                    return isValid;
                }
            })

    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<any>({
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = (data: any) => {
        setLoading(true);
        setSuccessful(false);
        data = {'category': data.category,
            'image': data.image[0] || "",
            'name': data.name,
            'scientific_name': data.scientific_name
        }

        dispatch(addPlant(data))
            .then((res: any) => {
                const newPlantId:number = res.id
                setSuccessful(true);
                dispatch(getPlants());
                dispatch(showPlantEdit(newPlantId))
            }, (err: any) => {
                setSuccessful(false);
                setLoading(false);
                // console.log("ERR", err);
                dispatch(hidePlantModals);
            })
                    .finally(() => {
                        setLoading(false);
                    });
    };

    const handlerShowAddCategory = (status:boolean) => {
        if (status) dispatch(showAddCategoryWindow())
        else dispatch(hideAddCategoryWindow())
    }
    
    
    const addPlantShow = (status:boolean) => { 
        reset()
        setSuccessful(false);
        setLoading(false);
        if (status) dispatch(showPlantAdd())
        else  dispatch(hidePlantModals())
        }


    return (
        <>
            <OverlayTrigger overlay={<Tooltip id="tooltip-add-new">Click for add new plant</Tooltip>}>
                <Card style={{ width: '14rem', margin: "0.5rem" }} onClick={() => addPlantShow(true)}>

                    <Card.Img
                        variant="top"
                        src={Z_URL.SERVER + "/media/SomePlant.png"}
                        width='100%'
                        onClick={() => addPlantShow(true)}
                    />

                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            &nbsp;<br />
                            &nbsp;<br />
                            <div className="d-grid gap-1">
                                <Button variant="outline-danger" size="sm">
                                    <strong> Add new plant </strong>
                                </Button></div>
                        </ListGroup.Item>
                    </ListGroup>

                </Card>
            </OverlayTrigger>

            <Modal show={isAddShow}
                onHide={() => addPlantShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-add-new"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-add-new">
                        <strong> Add new plant: </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="d-grid gap-1">
                    {!showAddCategory &&
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label>Plant name</label>
                                        <input
                                            type="text"
                                            {...register('name')}
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.name?.message as unknown as string}
                                        </div>


                                    </div>

                                    <div className="form-group">
                                        <label>Scientific name</label>
                                        <input
                                            type="text"
                                            {...register('scientific_name')}
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.email?.message as unknown as string}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>category</label><br />
                                        <select aria-label="Select category" defaultValue="1"
                                            {...register("category")}>
                                            {plantsCategories?.map((cat: plantCategory) =>
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>) || <option value='1'>undefined</option>}
                                        </select>
                                        &nbsp; &nbsp;
                                        {!showAddCategory &&
                                            <Button variant="outline-success" onClick={() => { handlerShowAddCategory(true) }} size="sm">
                                                Create new category
                                            </Button>}
                                    </div>

                                    <div className="form-group">
                                        <label>Image</label>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/gif"
                                            className={"form-control"}
                                            {...register('image')}
                                        />
                                    </div><br />

                                    <div className="form-group d-grid gap-1">
                                        <button className="btn btn-primary btn-block" disabled={loading}>
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Add</span>
                                        </button>
                                        </div></div>

                            )}

                        </form>}


                    {showAddCategory && <Button variant="outline-success" onClick={() => { handlerShowAddCategory(false) }} size="sm">
                        Back to new plant registration
                    </Button>} &nbsp;

                    {showAddCategory && <AddCategory />}
                </div>
                </Modal.Body>
            </Modal>



            <Modal show={editDetailShow}
                onHide={() => setEditDetailShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-detail"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-detail">
                        <strong> New plant </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? <span className="spinner-border spinner-border-sm"></span> : <ProfileForm />}

                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddPlantForm