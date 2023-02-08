import React, { useEffect, useState } from 'react'

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
import DetailForm from './ProfileForm';
import { fishCategory } from '../../interfaces';
import AddCategory from './AddCategory';
import fishService from '../../service/fishService';
import { addFish, getFishes, getFishProfile } from '../../actions/fishes';
import { hideFishModals, showFishAdd, showFishProfile } from '../../actions/fishModals';

const AddFishForm = () => {


    const dispatch: any = useAppDispatch();
    const { fishCategories } = useAppSelector(state => state.fishesReducer.categories);
    const { isAddShow } = useAppSelector(state => state.fishesReducer.fishModals);
    const [addNewCategory, setAddNewCategory] = useState<boolean>(false)

    const [isShowAddForm, setShowAddForm] = useState<boolean>(false);
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
        formState: { errors }
    } = useForm<any>({
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = (data: any) => {
        setLoading(true);
        setSuccessful(false);
        console.log("addFish", data);
        data = {'category': data.category,
            'image': data.image[0],
            'name': data.name,
            'scientific_name': data.scientific_name
        }

        dispatch(addFish(data))
            .then((res: any) => {
                setSuccessful(true);
                console.log("Add Fish \n response: ", res);
                dispatch(getFishes());
                dispatch(getFishProfile(res.id))
                    .then((res: any) => {
                        console.log("Fish profile loaded: \n", res);
                        dispatch(showFishProfile);
                    }, (error: any) => {
                        console.log("Fish profile Error: \n", error);
                        dispatch(hideFishModals);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }, (err: any) => {
                setSuccessful(false);
                setLoading(false);
                console.log("ERR", err);
                dispatch(hideFishModals);
            })
    };
    
    
    const addFishShow = (status:boolean) => { 
        setLoading(false);
        if (status) dispatch(showFishAdd())
        else  dispatch(hideFishModals())
        }


    useEffect(() => {
        console.log("errors", errors);

    }, [errors])


    return (
        <>
            <OverlayTrigger overlay={<Tooltip id="tooltip-detail">Click for add new fish</Tooltip>}>
                <Card style={{ width: '14rem', margin: "0.5rem" }} onClick={() => addFishShow(true)}>

                    <Card.Img
                        variant="top"
                        src={Z_URL.SERVER + "/media/SomeFish.png"}
                        width='100%'
                        onClick={() => addFishShow(true)}
                    />

                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            &nbsp;<br />
                            &nbsp;<br />
                            <div className="d-grid gap-1">
                                <Button variant="outline-danger" size="sm">
                                    <strong> Add new fish </strong>
                                </Button></div>
                        </ListGroup.Item>
                    </ListGroup>

                </Card>
            </OverlayTrigger>

            <Modal show={isAddShow}
                onHide={() => addFishShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-detail"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-detail">
                        <strong> Add new fish: </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="d-grid gap-1">
                    {!addNewCategory &&
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label>Fish name</label>
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
                                            {fishCategories?.map((cat: fishCategory) =>
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>) || <option value='1'>undefined</option>}
                                        </select>
                                        &nbsp; &nbsp;
                                        {!addNewCategory &&
                                            <Button variant="outline-success" onClick={() => { setAddNewCategory(prev => !prev) }} size="sm">
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


                    {addNewCategory && <Button variant="outline-success" onClick={() => { setAddNewCategory(prev => !prev) }} size="sm">
                        Back to new fish registration
                    </Button>} &nbsp;

                    {addNewCategory && <AddCategory />}
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
                        <strong> New fish </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? <span className="spinner-border spinner-border-sm"></span> : <DetailForm />}

                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddFishForm