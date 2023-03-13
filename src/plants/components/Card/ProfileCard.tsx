import React from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import Z_URL from '../../../service/constants';

import { useAppSelector } from "../../../store/hooks";
import { plantData } from '../../interfaces';

const ProfileCard = () => {


  const { isProfileShow } = useAppSelector(state => state.plantsReducer.plantModals);
  const { plantList } = useAppSelector(state => state.plantsReducer.plants);
  const { plantsCategories } = useAppSelector(state => state.plantsReducer.plantsCategories);

  var plantData: plantData = plantList?.filter((e: any) => { return e.id === isProfileShow.plantId })[0];
  const category = plantsCategories?.filter((e: any) => (e.id === plantData?.category))[0];

  const selector = [
    'DANGEROUS',
    'NOT RECOMMENDED',
    'NOT REQUIRED',
    'DOES NOT AFFECT',
    '-?-',
    'ALLOWED',
    'RECOMMENDED',
    'REQUIRED'
  ]


  // console.log("profile called", isProfileShow, plantData, plantList);
  return (

    <ListGroup className="list-group">
    <Card.Img
    className='profile-image-in-card'
      variant="top"
      src={Z_URL.SERVER + (plantData?.image || "/media/SomeFish.png")}
    />
      <ListGroup.Item>
        <Row><Col>Category: </Col><Col>{category?.name || "-?-"}</Col></Row>
        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Scientific name: </Col><Col>{plantData?.scientific_name || '-?-'}</Col></Row>
        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Family: </Col><Col>{plantData?.family || '-?-'}</Col></Row>
        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Origin: </Col><Col>{plantData?.origin || '-?-'}</Col></Row>
        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Care: </Col><Col>{plantData?.care || '-?-'}</Col></Row>
        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Average length: </Col><Col>{plantData?.average_length || '-?-'}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Temperature:</Col></Row>
        <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col>{plantData?.temperature_comfort_min || '-?-'} - {plantData?.temperature_comfort_max || '-?-'}</Col></Row>
        <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col>{plantData?.temperature_survive_min || '-?-'} - {plantData?.temperature_survive_max || '-?-'}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Hardness:</Col></Row>
        <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col>{plantData?.water_hardness_comfort_min || '-?-'} - {plantData?.water_hardness_comfort_max || '-?-'}</Col></Row>
        <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col>{plantData?.water_hardness_survive_min || '-?-'} - {plantData?.water_hardness_survive_max || '-?-'}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>PH:</Col></Row>
        <Row><Col style={{ paddingLeft: "5%" }}>Comfort limit: </Col><Col>{plantData?.ph_comfort_min || '-?-'} - {plantData?.ph_comfort_max || '-?-'}</Col></Row>
        <Row><Col style={{ paddingLeft: "5%" }}>Survive limit: </Col><Col>{plantData?.ph_survive_min || '-?-'} - {plantData?.ph_survive_max || '-?-'}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Aeration: </Col><Col>{selector[plantData?.aeration | 4]}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>CO2: </Col><Col>{selector[plantData?.co2 | 4]}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Filtration: </Col><Col>{selector[plantData?.filtration | 4]}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Streams: </Col><Col>{selector[plantData?.streams | 4]}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Illumination intensity: </Col><Col>{plantData?.illumination_intensity || '-?-'}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Illumination duration: </Col><Col>{plantData?.illumination_duration || '-?-'}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Soil: </Col><Col>{plantData?.soil || '-?-'}</Col></Row>

        <hr style={{ margin: "0", padding: "0" }} />
        <Row><Col>Water change: </Col><Col>{plantData?.water_change || '-?-'}</Col></Row>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default ProfileCard