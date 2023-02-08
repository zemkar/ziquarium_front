import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const FishCard = (fish:any) => {

    const [detailShow, setDetailShow] = useState<boolean>(false)

    let categoryList:any;
    let fishData:any;

    if (fish) { fish = fish?.fish}
    console.log("FISH:",typeof(fish), fish);
    
        // {Object.entries(fish).map((e:any, i:number) => { return <p key={i}>{e[0]} {e[1]}</p> })}
  return (
    <div>


        
{/* ********************************************************************************** */}
{/* ************************************** CARD ************************************** */}
{/* ********************************************************************************** */}
<OverlayTrigger overlay={<Tooltip id="tooltip-detail">Click for detail</Tooltip>}>
                <Card style={{ width: '14rem', margin: "0.5rem" }} key={fish.id}>

                    <Card.Img
                        variant="top"
                        src={fish?.image || "/media/SomeFish.png"}
                        width='100%'
                        onClick={() => setDetailShow(true)}
                    />
                    <ListGroup className="list-group-flush">

                        <ListGroup.Item
                            onClick={() => setDetailShow(true)}
                            >
                            <strong> {fish?.name} </strong>
                        </ListGroup.Item>

                        <ListGroup.Item
                            onClick={() => setDetailShow(true)}
                            >
                            {/* {fishData?.fish_value} pts/fish (total: {parseInt(JSON.parse(sessionStorage.getItem(fish.id))?.amount) * fishData?.fish_value || 0}) */}
                        </ListGroup.Item>

                        <ListGroup.Item>

                            <Card.Link
                                // onClick={() => setChangeAmountShow(true)}
                                >
                                {/* <MdAddCircle /><MdRemoveCircle /> */}
                                {/* Add/remove fish */}
                            </Card.Link>

                            <Card.Link
                                onClick={() => { }}> {/* TODO Add link to current fish page  TODO*/}
                                Fish page (WIP)
                            </Card.Link>
                            
                            {/* { is_staff? <Card.Link */}
                                {/* onClick={() => { setModDetailShow(true) }}>  */}
                                {/* TODO Add link to current fish page  TODO*/}
                                {/* Edit */}
                            {/* </Card.Link> : ""} */}

                        </ListGroup.Item>

                    </ListGroup>

                </Card>
            </OverlayTrigger>
{/* ********************************************************************************** */}
{/* ********************************** END CARD ************************************** */}
{/* ********************************************************************************** */}


{/* ********************************************************************************** */}
{/* *************************** CHANGE AMOUNT IN THE TANK **************************** */}
{/* ********************************************************************************** */}
{/* <Modal show={changeAmountShow}
                onHide={() => setChangeAmountShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="modal-change"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-change">
                        <strong> {fish?.name} </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Form onSubmit={handleSaveSubmit}>
                        <Form.Group className="change_fish_amount" controlId="ChangeFishAmount" >
                            <Form.Label>How many fishes you want see in tank?</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                defaultValue={parseInt(JSON.parse(sessionStorage.getItem(fish.id))?.amount) || 0}
                                autoFocus
                            />
                            <Form.Text className="text-muted">
                                Now in aquarium {parseInt(JSON.parse(sessionStorage.getItem(fish.id))?.amount) || 0} fishes.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="change_fish_amount" controlId="FishToTank" >
                            <Form.Label visuallyHidden='true'>Fish: </Form.Label>
                            <Form.Control
                                type="hidden"
                                value={fish.id}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
                            Save
                        </Button>
                    </Form>

                </Modal.Body>
            </Modal> */}
{/* ********************************************************************************** */}
{/* *********************** END CHANGE AMOUNT IN THE TANK **************************** */}
{/* ********************************************************************************** */}


{/* ********************************************************************************** */}
{/* ******************************* DETAILS OF FISH ********************************** */}
{/* ********************************************************************************** */}

<Modal show={detailShow}
                onHide={() => setDetailShow(false)}
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
                    <Card >
                        <ListGroup className="list-group">
                            <ListGroup.Item>
                                {/* <Row><Col>Category: </Col><Col>{categoryList.filter(e => (e.id === parseInt(fish.category)))[0]?.name ||  "-?-"}</Col></Row> */}
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
                </Modal.Body>
            </Modal>
{/* ********************************************************************************** */}
{/* *************************** END DETAILS OF FISH ********************************** */}
{/* ********************************************************************************** */}

{/* ********************************************************************************** */}
{/* ***************************** MOD DETAILS OF FISH ******************************** */}
{/* ********************************************************************************** */}
{/* 
<Modal show={modDetailShow}
                onHide={() => setModDetailShow(false)}
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

                </Modal.Body>
            </Modal> */}
{/* ********************************************************************************** */}
{/* ************************* END MOD DETAILS OF FISH ******************************** */}
{/* ********************************************************************************** */}
    </div>
  )
}

export default FishCard