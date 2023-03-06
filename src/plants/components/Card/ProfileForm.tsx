import React from 'react'

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { plantCategory } from '../../interfaces';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getPlants, modPlant } from '../../actions/plants';
import AddCategory from './AddCategory';
import { hideAddCategoryWindow, hidePlantModals, showAddCategoryWindow } from '../../actions/plantsModals';


const ProfileForm = () => {
    const dispatch: any = useAppDispatch();
    const { plantList } = useAppSelector(state => state.plantsReducer.plants);
    const { plantsCategories } = useAppSelector(state => state.plantsReducer.plantsCategories);
    const { isEditShow } = useAppSelector(state => state.plantsReducer.plantModals);
    var plantData: any = plantList?.filter((e: any) => { return e.id === isEditShow.plantId })[0];
    const { user: currentUser } = useAppSelector(state => state.authReducers.auth);

    const { status: showAddCategory } = useAppSelector(state => state.plantsReducer.plantsAddCategoryReducer);

    const selector = [
        {number: "0", title: 'DANGEROUS'},
        {number: "1", title: 'NOT RECOMMENDED'},
        {number: "2", title: 'NOT REQUIRED'},
        {number: "3", title: 'DOES NOT AFFECT'},
        {number: "4", title: 'UNKNOWN'},
        {number: "5", title: 'ALLOWED'},
        {number: "6", title: 'RECOMMENDED'},
        {number: "7", title: 'REQUIRED'}
    ]


    const validationSchema = Yup.object().shape({});

    const {
        register,
        handleSubmit,
        // formState: { errors }
    } = useForm<any>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: any) => {
        data["id"] = plantData?.id
        console.log("data to mod", data);
        dispatch(modPlant(data))
            .then(
                (res: any) => {
                    dispatch(getPlants());
                    dispatch(hidePlantModals());
                },
                (err: any) => { console.log("modPlantProfile Error:", err); }
            )
    }

    const handlerShowAddCategory = (status: boolean) => {
        if (status) dispatch(showAddCategoryWindow())
        else dispatch(hideAddCategoryWindow())
    }

    return (

        < >
            {showAddCategory ? <>
                <Button variant="outline-success" onClick={() => { handlerShowAddCategory(false) }} size="sm">
                    Back to new plant editor
                </Button> &nbsp;
                <AddCategory />
            </> : <>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ListGroup className="list-group">
                        <ListGroup.Item>
                            <Row><Col>Category: </Col><Col>
                                <Form.Select aria-label="Select category" size="sm" {...register('category')} defaultValue={plantData?.category}>
                                    {plantsCategories?.map((cat: plantCategory) => <option key={cat.id} value={cat.id}>{cat.name}</option>) || <option value='2'>undefined</option>}</Form.Select></Col>
                                <Col>
                                    <Button variant="outline-secondary" onClick={() => { handlerShowAddCategory(true) }} size="sm">
                                        Add new category
                                    </Button>

                                </Col></Row>
                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Scientific name: </Col><Col><Form.Control id='scientific_name' {...register('scientific_name')} defaultValue={plantData?.scientific_name} size="sm" /></Col></Row>


                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Family: </Col><Col><Form.Control id='family' {...register('family')} defaultValue={plantData?.family} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Origin: </Col><Col><Form.Control id='origin' {...register('origin')} defaultValue={plantData?.origin} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Care: </Col><Col><Form.Control id='care' {...register('care')} defaultValue={plantData?.care} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Temperature:</Col><Col>Min</Col><Col>Max</Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control type='number' id='temperature_comfort_min' {...register('temperature_comfort_min')} defaultValue={plantData?.temperature_comfort_min} size="sm" /></Col><Col><Form.Control type='number' id='temperature_comfort_max' {...register('temperature_comfort_max')} defaultValue={plantData?.temperature_comfort_max} size="sm" /></Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control type='number' id='temperature_survive_min' {...register('temperature_survive_min')} defaultValue={plantData?.temperature_survive_min} size="sm" /></Col><Col><Form.Control type='number' id='temperature_survive_max' {...register('temperature_survive_max')} defaultValue={plantData?.temperature_survive_max} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Hardness:</Col><Col>Min</Col><Col>Max</Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control type='number' id='water_hardness_comfort_min' {...register('water_hardness_comfort_min')} defaultValue={plantData?.water_hardness_comfort_min} size="sm" /></Col><Col><Form.Control type='number' id='water_hardness_comfort_max' {...register('water_hardness_comfort_max')} defaultValue={plantData?.water_hardness_comfort_max} size="sm" /></Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control type='number' id='water_hardness_survive_min' {...register('water_hardness_survive_min')} defaultValue={plantData?.water_hardness_survive_min} size="sm" /></Col><Col><Form.Control type='number' id='water_hardness_survive_max' {...register('water_hardness_survive_max')} defaultValue={plantData?.water_hardness_survive_max} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>PH:</Col><Col>Min</Col><Col>Max</Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control type='number' id='ph_comfort_min' {...register('ph_comfort_min')} defaultValue={plantData?.ph_comfort_min} size="sm" /></Col><Col><Form.Control type='number' id='ph_comfort_max' {...register('ph_comfort_max')} defaultValue={plantData?.ph_comfort_max} size="sm" /></Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control type='number' id='ph_survive_min' {...register('ph_survive_min')} defaultValue={plantData?.ph_survive_min} size="sm" /></Col><Col><Form.Control type='number' id='ph_survive_max' {...register('ph_survive_max')} defaultValue={plantData?.ph_survive_max} size="sm" /></Col></Row>


                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Aeration: </Col><Col><Form.Select id='aeration' {...register('aeration')} size="sm" >
                                {selector.map((e: {number:string, title:string}, i: number) => <option key={i} value={e.number} selected={e.number === ""+(plantData?.aeration | 4)}> {e.title}</option>)}</ Form.Select>
                            </Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>CO2: </Col><Col><Form.Select id='co2' {...register('co2')} size="sm" >
                                {selector.map((e: {number:string, title:string}, i: number) => <option key={i} value={e.number} selected={e.number === ""+(plantData?.co2 | 4)}> {e.title}</option>)}</ Form.Select>
                            </Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Filtration: </Col><Col><Form.Select id='filtration' {...register('filtration')} size="sm" >
                                {selector.map((e: {number:string, title:string}, i: number) => <option key={i} value={e.number} selected={e.number === ""+(plantData?.filtration | 4)}> {e.title}</option>)}</ Form.Select>
                            </Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Streams: </Col><Col><Form.Select id='streams' {...register('streams')} size="sm" >
                                {selector.map((e: {number:string, title:string}, i: number) => <option key={i} value={e.number} selected={e.number === ""+(plantData?.streams | 4)}> {e.title}</option>)}</ Form.Select>
                            </Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Illumination intensity: </Col><Col><Form.Control id='illumination_intensity' {...register('illumination_intensity')} defaultValue={plantData?.illumination_intensity | 0} type='number' size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Illumination duration: </Col><Col><Form.Control id='illumination_duration' {...register('illumination_duration')} defaultValue={plantData?.illumination_duration | 0} type='number' size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Soil: </Col><Col><Form.Control id='soil' {...register('soil')} defaultValue={plantData?.soil} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Water change: </Col><Col><Form.Control id='water_change' {...register('water_change')} defaultValue={plantData?.water_change} size="sm" /></Col></Row>


                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>User placeholder: </Col><Col><Form.Control id='user_placeholder' {...register('user_placeholder')} defaultValue={plantData?.user_placeholder} size="sm" disabled={!currentUser?.admin} /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Latest editor: </Col><Col><Form.Control id='latest_editor' {...register('latest_editor')} defaultValue={plantData?.latest_editor} size="sm" disabled={!currentUser?.admin} /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Approving user: </Col><Col><Form.Control id='approving_user' {...register('approving_user')} defaultValue={plantData?.approving_user} size="sm" disabled={!currentUser?.admin} /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Approved: </Col><Col><Form.Check type="switch" id='approved' {...register('approved')} defaultChecked={plantData?.approved} disabled={!currentUser?.admin} /></Col></Row>


                        </ListGroup.Item>
                        <Button variant="primary" type="submit" >
                            Save
                        </Button>
                    </ListGroup>
                </Form>
            </>
            }
        </>
    )
}

export default ProfileForm