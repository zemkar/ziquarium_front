import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getFishes, getFishCategories, getFishesData } from '../actions/fishes';
import { fish } from '../interfaces';
import AddFishForm from './Card/AddFishForm';
import FishCard from './Card/FishCard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FishFilters from './Panels/FishFilters';

const FishIndex = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [fishesToPrint, setFishesToPrint] = useState<any[]>([])

  const { fishes } = useAppSelector(state => state.fishesReducer.fishes);
  const { fishCategories } = useAppSelector(state => state.fishesReducer.categories);
  const { user: currentUser } = useAppSelector(state => state.authReducers.auth)
  const { categoryFilter } = useAppSelector(state => state.fishesReducer.fishFilters);

  const dispatch: any = useAppDispatch()

  // Load fish data
  useEffect(() => {
    if (!fishes || fishes.length < 1) {
      setLoading(true)

      dispatch(getFishes())
        .then((res: any) => {},
          (err: any) => { console.log("FishIndex - useEffect - fishes \n got error:", err) }
        )
        .finally(() => {
          setLoading(false);
        })
      dispatch(getFishesData())
    }
  }, [dispatch, fishes])

// Load fish categories
  useEffect(() => {
    if (!fishCategories || fishCategories.length < 1) {
      dispatch(getFishCategories())
        .then((res: any) => {},
          (err: any) => { console.log("FishIndex - useEffect - fishCategories \n got error:", err) }
        )
    }
  }, [dispatch, fishCategories])

// Filter by category
  useEffect(() => {
    if (+categoryFilter !== 0) {
      setFishesToPrint(fishes.filter((fish: any) => { return +fish.category === +categoryFilter }));
    }
    else {
      setFishesToPrint(fishes);
    }
  }, [categoryFilter, fishes])
  


  return (
    <div>
      <FishFilters /><hr style={{ color: 'white' }} />
      <Row xs={1} sm={2} md={3} lg={4} xxl={5}>
        {!loading && currentUser && currentUser.editor && <Col><AddFishForm /></Col>}
        {fishesToPrint?.map((fish: fish, i: number) => <Col key={i.toString() + "c"}><div key={i.toString() + "d"}><FishCard key={i.toString() + "f"} fish={fish} /></div></Col>)}
        {loading && (
          <><Col></Col><Col><span className="spinner-border spinner-border-sm"></span></Col></>
        )}</Row>
    </div>
  )
}

export default FishIndex