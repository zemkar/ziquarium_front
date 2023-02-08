import React from 'react'
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const DetailCard = () => {
  
  const { fishData } = useAppSelector(state => state.fishesReducer.profile);
  const { fishCategories } = useAppSelector(state => state.fishesReducer.categories);

  const category = fishCategories?.filter((e: any) => (e.id === fishData?.category))[0];


  return (
    
    <Card >
    <ListGroup className="list-group">
        <ListGroup.Item>
            <Row><Col>Category: </Col><Col>{category?.name ||  "-?-"}</Col></Row>
            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Scientific name: </Col><Col>{fishData?.scientific_name || '-?-'}</Col></Row>
            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Lifespan: </Col><Col>{fishData?.lifespan || '-?-'}</Col></Row>
            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Social: </Col><Col>{fishData?.social || '-?-'}</Col></Row>
            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Tank level: </Col><Col>{fishData?.tank_level || '-?-'}</Col></Row>
            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Flock: </Col><Col>{fishData?.flock || '-?-'}</Col></Row>
            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Diet: </Col><Col>{fishData?.diet || '-?-'}</Col></Row>

            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Temperature:</Col></Row>
            <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col>{fishData?.temperature_comfort_min || '-?-'} - {fishData?.temperature_comfort_max || '-?-'}</Col></Row>
            <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col>{fishData?.temperature_survive_min || '-?-'} - {fishData?.temperature_survive_max || '-?-'}</Col></Row>

            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Hardness:</Col></Row>
            <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col>{fishData?.water_hardness_comfort_min || '-?-'} - {fishData?.water_hardness_comfort_max || '-?-'}</Col></Row>
            <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col>{fishData?.water_hardness_survive_min || '-?-'} - {fishData?.water_hardness_survive_max || '-?-'}</Col></Row>

            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>PH:</Col></Row>
            <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col>{fishData?.ph_comfort_min || '-?-'} - {fishData?.ph_comfort_max || '-?-'}</Col></Row>
            <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col>{fishData?.ph_survive_min || '-?-'} - {fishData?.ph_survive_max || '-?-'}</Col></Row>

            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Minimal tank size: </Col><Col>{fishData?.min_tank_size_one || '-?-'}</Col></Row>
            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Minimal volume: </Col><Col>{fishData?.min_water_volume_one || '-?-'}</Col></Row>

            <hr style={{ margin: "0", padding: "0" }} />
            <Row><Col>Average length: </Col></Row>
            <Row><Col style={{ paddingLeft: "5%" }}>Male -    </Col><Col>{fishData?.male_average_length || '-?-'}</Col></Row>
            <Row><Col style={{ paddingLeft: "5%" }}>Female -  </Col><Col>{fishData?.female_average_length || '-?-'}</Col></Row>
        </ListGroup.Item>
    </ListGroup>
</Card>
  )
}

export default DetailCard