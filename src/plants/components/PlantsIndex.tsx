import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPlants, getPlantCategories } from '../actions/plants';
import { plantData } from '../interfaces';
import AddPlantForm from './Card/AddPlantForm';
import PlantCard from './Card/PlantCard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlantFilters from './Panels/PlantFilters';

const PlantsIndex = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [plantsToPrint, setPlantsToPrint] = useState<any[]>([])

  const { plantList} = useAppSelector(state => state.plantsReducer.plants);
  const { plantsCategories } = useAppSelector(state => state.plantsReducer.plantsCategories);
  const { user: currentUser } = useAppSelector(state => state.authReducers.auth)
  const { categoryFilter } = useAppSelector(state => state.plantsReducer.plantFilters);

  const dispatch: any = useAppDispatch()

  // Load plant data
  useEffect(() => {
    if (!plantList || plantList.length < 1) {
      setLoading(true)

      dispatch(getPlants())
        .then((res: any) => {},
          (err: any) => { console.log("PlantIndex - useEffect - plantList \n got error:", err) }
        )
        .finally(() => {
          setLoading(false);
        })
    }
  }, [dispatch, plantList])

// Load plant categories
  useEffect(() => {
    if (!plantsCategories || plantsCategories.length < 1) {
      dispatch(getPlantCategories())
        .then((res: any) => {},
          (err: any) => { console.log("PlantIndex - useEffect - plantCategories \n got error:", err) }
        )
    }
  }, [dispatch, plantsCategories])

// Filter by category
  useEffect(() => {
    if (+categoryFilter !== 0) {
      setPlantsToPrint(plantList.filter((plant: any) => { return +plant.category === +categoryFilter }));
    }
    else {
      setPlantsToPrint(plantList);
    }
  }, [categoryFilter, plantList])
  


  return (
    <div>
      <PlantFilters /><hr style={{ color: 'white' }} />
      <Row xs={1} sm={2} md={3} lg={4} xxl={5}>
        {!loading && currentUser && currentUser.editor && <Col><AddPlantForm /></Col>}
        {plantsToPrint?.map((plant: plantData, i: number) => <Col key={i.toString() + "c"}><div key={i.toString() + "d"}><PlantCard key={i.toString() + "f"} plant={plant} /></div></Col>)}
        {loading && (
          <><Col></Col><Col><span className="spinner-border spinner-border-sm"></span></Col></>
        )}</Row>
    </div>
  )
}

export default PlantsIndex