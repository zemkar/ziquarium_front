import React from 'react'

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { fishCategory } from '../../interfaces';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFishes, modFish } from '../../actions/fishes';
import AddCategory from './AddCategory';
import { hideAddCategoryWindow, hideFishModals, showAddCategoryWindow } from '../../actions/fishModals';

const ProfileForm = () => {
    const dispatch: any = useAppDispatch();
    const { fishList } = useAppSelector(state => state.fishesReducer.fishes);
    const { isEditShow } = useAppSelector(state => state.fishesReducer.fishModals);
    const { fishCategories } = useAppSelector(state => state.fishesReducer.categories);
    const { user: currentUser } = useAppSelector(state => state.authReducers.auth);
    
    var fishData: any = fishList?.filter((e: any) => { return e.id === isEditShow.fishId })[0];

    const { status: showAddCategory } = useAppSelector(state => state.fishesReducer.fishAddCategoryReducer);


    const validationSchema = Yup.object().shape({});
    const {
        register,
        handleSubmit,
        // formState: { errors }
    } = useForm<any>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: any) => {
        data["id"] = fishData?.id

        dispatch(modFish(data))
            .then(
                (res: any) => {
                    dispatch(getFishes());
                    dispatch(hideFishModals());
                },
                (err: any) => { console.log("modFishProfile Error:", err); }
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
                Back to new fish editor
            </Button> &nbsp;
            <AddCategory />
            </> : <>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ListGroup className="list-group">
                        <ListGroup.Item>
                            <Row><Col>Category: </Col><Col>
                            <Form.Select aria-label="Select category" size="sm" {...register('category')} defaultValue={fishData?.category}>
                                {fishCategories?.map((cat: fishCategory) => <option key={cat.id} value={cat.id}>{cat.name}</option>) || <option value='2'>undefined</option>}</Form.Select></Col>
                            <Col>
                                    <Button variant="outline-secondary" onClick={() => { handlerShowAddCategory(true) }} size="sm">
                                        Add new category
                                    </Button>

                            </Col></Row>
                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Scientific name: </Col><Col><Form.Control id='scientific_name' {...register('scientific_name')} defaultValue={fishData?.scientific_name} size="sm" /></Col></Row>
                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Lifespan: </Col><Col><Form.Control type='number' id='lifespan' {...register('lifespan')} defaultValue={fishData?.lifespan} size="sm" /></Col></Row>
                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Social: </Col><Col><Form.Control id='social' {...register('social')} defaultValue={fishData?.social} size="sm" /></Col></Row>
                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Tank level: </Col><Col><Form.Control id='tank_level' {...register('tank_level')} defaultValue={fishData?.tank_level} size="sm" /></Col></Row>
                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Flock: </Col><Col><Form.Control id='flock' {...register('flock')} defaultValue={fishData?.flock} size="sm" /></Col></Row>
                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Diet: </Col><Col><Form.Control id='diet' {...register('diet')} defaultValue={fishData?.diet} size="sm" /></Col></Row>
                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Care: </Col><Col><Form.Control id='care' {...register('care')} defaultValue={fishData?.care} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Temperature:</Col><Col>Min</Col><Col>Max</Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control type='number' id='temperature_comfort_min' {...register('temperature_comfort_min')} defaultValue={fishData?.temperature_comfort_min} size="sm" /></Col><Col><Form.Control type='number' id='temperature_comfort_max' {...register('temperature_comfort_max')} defaultValue={fishData?.temperature_comfort_max} size="sm" /></Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control type='number' id='temperature_survive_min' {...register('temperature_survive_min')} defaultValue={fishData?.temperature_survive_min} size="sm" /></Col><Col><Form.Control type='number' id='temperature_survive_max' {...register('temperature_survive_max')} defaultValue={fishData?.temperature_survive_max} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Hardness:</Col><Col>Min</Col><Col>Max</Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control type='number' id='water_hardness_comfort_min' {...register('water_hardness_comfort_min')} defaultValue={fishData?.water_hardness_comfort_min} size="sm" /></Col><Col><Form.Control type='number' id='water_hardness_comfort_max' {...register('water_hardness_comfort_max')} defaultValue={fishData?.water_hardness_comfort_max} size="sm" /></Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control type='number' id='water_hardness_survive_min' {...register('water_hardness_survive_min')} defaultValue={fishData?.water_hardness_survive_min} size="sm" /></Col><Col><Form.Control type='number' id='water_hardness_survive_max' {...register('water_hardness_survive_max')} defaultValue={fishData?.water_hardness_survive_max} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>PH:</Col><Col>Min</Col><Col>Max</Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control type='number' id='ph_comfort_min' {...register('ph_comfort_min')} defaultValue={fishData?.ph_comfort_min} size="sm" /></Col><Col><Form.Control type='number' id='ph_comfort_max' {...register('ph_comfort_max')} defaultValue={fishData?.ph_comfort_max} size="sm" /></Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control type='number' id='ph_survive_min' {...register('ph_survive_min')} defaultValue={fishData?.ph_survive_min} size="sm" /></Col><Col><Form.Control type='number' id='ph_survive_max' {...register('ph_survive_max')} defaultValue={fishData?.ph_survive_max} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Minimal tank size: </Col><Col><Form.Control id='min_tank_size_one' {...register('min_tank_size_one')} defaultValue={fishData?.min_tank_size_one} size="sm" /></Col></Row>
                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Minimal volume: </Col><Col><Form.Control type='number' id='min_water_volume_one' {...register('min_water_volume_one')} defaultValue={fishData?.min_water_volume_one} size="sm" /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Average length: </Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Male -    </Col><Col><Form.Control type='number' id='male_average_length' {...register('male_average_length')} defaultValue={fishData?.male_average_length} size="sm" /></Col></Row>
                            <Row><Col style={{ paddingLeft: "5%" }}>Female -  </Col><Col><Form.Control type='number' id='female_average_length' {...register('female_average_length')} defaultValue={fishData?.female_average_length} size="sm" /></Col></Row>
                        
                        
                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>User placeholder: </Col><Col><Form.Control id='user_placeholder' {...register('user_placeholder')} defaultValue={fishData?.user_placeholder} size="sm" disabled={!currentUser?.admin} /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Latest editor: </Col><Col><Form.Control id='latest_editor' {...register('latest_editor')} defaultValue={fishData?.latest_editor} size="sm" disabled={!currentUser?.admin} /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Approving user: </Col><Col><Form.Control id='approving_user' {...register('approving_user')} defaultValue={fishData?.approving_user} size="sm" disabled={!currentUser?.admin} /></Col></Row>

                            <hr style={{ margin: "1px", padding: "0" }} />
                            <Row><Col>Approved: </Col><Col><Form.Check type="switch" id='approved' {...register('approved')} defaultChecked={fishData?.approved} disabled={!currentUser?.admin} /></Col></Row>


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