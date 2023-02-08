import React, { FormEvent, useState } from 'react'
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { fishCategory } from '../../interfaces';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { modFishProfile } from '../../actions/fishes';

const DetailForm = () => {
    const { fishData } = useAppSelector(state => state.fishesReducer.profile);
    const { fishCategories } = useAppSelector(state => state.fishesReducer.categories);
    
  const category = fishCategories?.filter((e: any) => (e.id === fishData?.category))[0];
  console.log("fish test: \n", fishData, "\n cats: \n", fishCategories, "and category of fish: \n", category);
  

    const [addNewCategory, setAddNewCategory] = useState(false)

    
    const [AuthError, setAuthError] = useState<string|null>(null)
    const [ScientificNameError, setScientificNameError] = useState<string|null>(null)
    const [CategoryError, setCategoryError] = useState<string|null>(null)

    const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setAuthError(null);
        setScientificNameError(null);
        setCategoryError(null);


        console.log("detail Form Submitted:\n", event);
        
    }
  return (
    
    <Card >
    <Form onSubmit={handlerSubmit}>
            <ListGroup className="list-group">
                <ListGroup.Item><Row><Col>Category: </Col><Col>

                
                {addNewCategory ?
                        <Form.Control type="text" placeholder="Category" id="category" size="sm"
                        defaultValue={category.name || ""} />
                    :
                    <Form.Select aria-label="Select category" size="sm"  defaultValue={fishData.category}>
                        {fishCategories?.map((cat:fishCategory) => <option key={cat.id} value={cat.id}>{cat.name}</option>)||<option value='2'>undefined</option>}</Form.Select>}</Col>
                        <Col><Button variant="outline-secondary" onClick={() => { setAddNewCategory(prev => !prev) }} size="sm">
                    {!addNewCategory ? "New Category" : "Chose category"}
                </Button>
                
                </Col></Row>
                {CategoryError && <Row><Col>{CategoryError}</Col></Row>}
                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Scientific name: </Col><Col><Form.Control id='scientific_name' defaultValue={fishData?.scientific_name} size="sm" /></Col></Row>
                    {ScientificNameError && <Row><Col>{ScientificNameError}</Col></Row>}
                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Lifespan: </Col><Col><Form.Control id='lifespan' defaultValue={fishData.lifespan} size="sm" /></Col></Row>
                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Social: </Col><Col><Form.Control id='social' defaultValue={fishData.social} size="sm" /></Col></Row>
                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Tank level: </Col><Col><Form.Control id='tank_level' defaultValue={fishData.tank_level} size="sm" /></Col></Row>
                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Flock: </Col><Col><Form.Control id='flock' defaultValue={fishData.flock} size="sm" /></Col></Row>
                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Diet: </Col><Col><Form.Control id='diet' defaultValue={fishData.diet} size="sm" /></Col></Row>

                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Temperature:</Col><Col>Min</Col><Col>Max</Col></Row>
                    <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control id='temperature_comfort_min' defaultValue={fishData.temperature_comfort_min} size="sm" /></Col><Col><Form.Control id='temperature_comfort_max' defaultValue={fishData.temperature_comfort_max} size="sm" /></Col></Row>
                    <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control id='temperature_survive_min' defaultValue={fishData.temperature_survive_min} size="sm" /></Col><Col><Form.Control id='temperature_survive_max' defaultValue={fishData.temperature_survive_max} size="sm" /></Col></Row>

                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Hardness:</Col><Col>Min</Col><Col>Max</Col></Row>
                    <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control id='water_hardness_comfort_min' defaultValue={fishData.water_hardness_comfort_min} size="sm" /></Col><Col><Form.Control id='water_hardness_comfort_max' defaultValue={fishData.water_hardness_comfort_max} size="sm" /></Col></Row>
                    <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control id='water_hardness_survive_min' defaultValue={fishData.water_hardness_survive_min} size="sm" /></Col><Col><Form.Control id='water_hardness_survive_max' defaultValue={fishData.water_hardness_survive_max} size="sm" /></Col></Row>

                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>PH:</Col><Col>Min</Col><Col>Max</Col></Row>
                    <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col><Form.Control id='ph_comfort_min' defaultValue={fishData.ph_comfort_min} size="sm" /></Col><Col><Form.Control id='ph_comfort_max' defaultValue={fishData.ph_comfort_max} size="sm" /></Col></Row>
                    <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col><Form.Control id='ph_survive_min' defaultValue={fishData.ph_survive_min} size="sm" /></Col><Col><Form.Control id='ph_survive_max' defaultValue={fishData.ph_survive_max} size="sm" /></Col></Row>

                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Minimal tank size: </Col><Col><Form.Control id='min_tank_size_one' defaultValue={fishData.min_tank_size_one} size="sm" /></Col></Row>
                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Minimal volume: </Col><Col><Form.Control id='min_water_volume_one' defaultValue={fishData.min_water_volume_one} size="sm" /></Col></Row>

                    <hr style={{ margin: "0", padding: "0" }} />
                    <Row><Col>Average length: </Col></Row>
                    <Row><Col style={{ paddingLeft: "5%" }}>Male -    </Col><Col><Form.Control id='male_average_length' defaultValue={fishData.male_average_length} size="sm" /></Col></Row>
                    <Row><Col style={{ paddingLeft: "5%" }}>Female -  </Col><Col><Form.Control id='female_average_length' defaultValue={fishData.female_average_length} size="sm" /></Col></Row>
                </ListGroup.Item>
            <Button variant="primary" type="submit" >
               Save
            </Button>
            </ListGroup>
            </Form>
        </Card>
  )
}

export default DetailForm