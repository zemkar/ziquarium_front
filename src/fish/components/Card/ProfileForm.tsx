import React, { FormEvent, useState } from 'react'

import Card from "react-bootstrap/Card";
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
import { modFishProfile } from '../../actions/fishes';
import AddCategory from './AddCategory';

const DetailForm = () => {
    const { fishData } = useAppSelector(state => state.fishesReducer.profile);
    const { fishCategories } = useAppSelector(state => state.fishesReducer.categories);

    const category = fishCategories?.filter((e: any) => (e.id === fishData?.category))[0];

    const [addNewCategory, setAddNewCategory] = useState(false)

    const [AuthError, setAuthError] = useState<string | null>(null)
    const [ScientificNameError, setScientificNameError] = useState<string | null>(null)
    const [CategoryError, setCategoryError] = useState<string | null>(null)

    const validationSchema = Yup.object().shape({});
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<any>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: any) => {

        setAuthError(null);
        setScientificNameError(null);
        setCategoryError(null);


        console.log("detail Form Submitted:\n", data);

    }
    return (

        <Card >
            {addNewCategory && <Button variant="outline-success" onClick={() => { setAddNewCategory(prev => !prev) }} size="sm">
                Back to new fish editor
            </Button>} &nbsp;

            {addNewCategory && <AddCategory />} 
            {!addNewCategory && (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ListGroup className="list-group">
                    <ListGroup.Item><Row><Col>Category: </Col><Col>


                        <Form.Select aria-label="Select category" size="sm" {...register('category')} defaultValue={fishData.category}>
                                {fishCategories?.map((cat: fishCategory) => <option key={cat.id} value={cat.id}>{cat.name}</option>) || <option value='2'>undefined</option>}</Form.Select></Col>
                        <Col>
                        <Button variant="outline-secondary" onClick={() => { setAddNewCategory(prev => !prev) }} size="sm">
                            Add new category
                        </Button>

                        </Col></Row>
                        {CategoryError && <Row><Col>{CategoryError}</Col></Row>}
                        <hr style={{ margin: "0", padding: "0" }} />

                        <Row><Col>Scientific name: </Col><Col><Form.Control id='scientific_name' {...register('scientific_name')} defaultValue={fishData?.scientific_name} size="sm" /></Col></Row>
                        {ScientificNameError && <Row><Col>{ScientificNameError}</Col></Row>}
                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>Lifespan: </Col><Col><Form.Control id='lifespan' {...register('lifespan')} defaultValue={fishData.lifespan} size="sm" /></Col></Row>
                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>Social: </Col><Col><Form.Control id='social' {...register('social')} defaultValue={fishData.social} size="sm" /></Col></Row>
                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>Tank level: </Col><Col><Form.Control id='tank_level' {...register('tank_level')} defaultValue={fishData.tank_level} size="sm" /></Col></Row>
                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>Flock: </Col><Col><Form.Control id='flock' {...register('flock')} defaultValue={fishData.flock} size="sm" /></Col></Row>
                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>Diet: </Col><Col><Form.Control id='diet' {...register('diet')} defaultValue={fishData.diet} size="sm" /></Col></Row>

                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>Temperature:</Col><Col>Min</Col><Col>Max</Col></Row>
                        <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control id='temperature_comfort_min' {...register('temperature_comfort_min')} defaultValue={fishData.temperature_comfort_min} size="sm" /></Col><Col><Form.Control id='temperature_comfort_max' {...register('temperature_comfort_max')} defaultValue={fishData.temperature_comfort_max} size="sm" /></Col></Row>
                        <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control id='temperature_survive_min' {...register('temperature_survive_min')} defaultValue={fishData.temperature_survive_min} size="sm" /></Col><Col><Form.Control id='temperature_survive_max' {...register('temperature_survive_max')} defaultValue={fishData.temperature_survive_max} size="sm" /></Col></Row>

                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>Hardness:</Col><Col>Min</Col><Col>Max</Col></Row>
                        <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control id='water_hardness_comfort_min' {...register('water_hardness_comfort_min')} defaultValue={fishData.water_hardness_comfort_min} size="sm" /></Col><Col><Form.Control id='water_hardness_comfort_max' {...register('water_hardness_comfort_max')} defaultValue={fishData.water_hardness_comfort_max} size="sm" /></Col></Row>
                        <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control id='water_hardness_survive_min' {...register('water_hardness_survive_min')} defaultValue={fishData.water_hardness_survive_min} size="sm" /></Col><Col><Form.Control id='water_hardness_survive_max' {...register('water_hardness_survive_max')} defaultValue={fishData.water_hardness_survive_max} size="sm" /></Col></Row>

                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>PH:</Col><Col>Min</Col><Col>Max</Col></Row>
                        <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control id='ph_comfort_min' {...register('ph_comfort_min')} defaultValue={fishData.ph_comfort_min} size="sm" /></Col><Col><Form.Control id='ph_comfort_max' {...register('ph_comfort_max')} defaultValue={fishData.ph_comfort_max} size="sm" /></Col></Row>
                        <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control id='ph_survive_min' {...register('ph_survive_min')} defaultValue={fishData.ph_survive_min} size="sm" /></Col><Col><Form.Control id='ph_survive_max' {...register('ph_survive_max')} defaultValue={fishData.ph_survive_max} size="sm" /></Col></Row>

                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>Minimal tank size: </Col><Col><Form.Control id='min_tank_size_one' {...register('min_tank_size_one')} defaultValue={fishData.min_tank_size_one} size="sm" /></Col></Row>
                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>Minimal volume: </Col><Col><Form.Control id='min_water_volume_one' {...register('min_water_volume_one')} defaultValue={fishData.min_water_volume_one} size="sm" /></Col></Row>

                        <hr style={{ margin: "0", padding: "0" }} />
                        <Row><Col>Average length: </Col></Row>
                        <Row><Col style={{ paddingLeft: "5%" }}>Male -    </Col><Col><Form.Control id='male_average_length' {...register('male_average_length')} defaultValue={fishData.male_average_length} size="sm" /></Col></Row>
                        <Row><Col style={{ paddingLeft: "5%" }}>Female -  </Col><Col><Form.Control id='female_average_length' {...register('female_average_length')} defaultValue={fishData.female_average_length} size="sm" /></Col></Row>
                    </ListGroup.Item>
                    <Button variant="primary" type="submit" >
                        Save
                    </Button>
                </ListGroup>
            </Form>)
            }
        </Card>
    )
}

export default DetailForm