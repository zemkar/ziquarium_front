import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getFishes, getFishCategories } from '../actions/fishes';
import { fish } from '../interfaces';
import AddFishForm from './Card/AddFishForm';
import FishCard from './Card/FishCard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FishIndex = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { fishes } = useAppSelector(state => state.fishesReducer.fishes);
  const { fishCategories } = useAppSelector(state => state.fishesReducer.categories);
  const { user: currentUser } = useAppSelector(state => state.authReducers.auth)
  const dispatch: any = useAppDispatch()

  useEffect(() => {
    if (!fishes || fishes.length < 1) {
      setLoading(true)
      dispatch(getFishes())
        .then((res: any) => {console.log("FishIndex - useEffect - fishes \n", res)},
          (err:any) => {console.log("FishIndex - useEffect - fishes \n got error:", err)}
        )
        .finally(()=>{setLoading(false)})
    }
  }, [dispatch, fishes])


  useEffect(() => {
    if (!fishCategories || fishCategories.length < 1) {
      dispatch(getFishCategories())
        .then((res: any) => {console.log("FishIndex - useEffect - fishCategories \n", res)},
          (err:any) => {console.log("FishIndex - useEffect - fishCategories \n got error:", err)}
        )
    }
  }, [dispatch, fishCategories])

  console.log("FISHES MAP", fishes);

  return (
    <div>
    <Row xs={1} sm={2} md={3} lg={4} xl={5}>
      {fishes?.map((fish: fish, i: number) => <Col key={i.toString()+"c"}><div key={i.toString()+"d"}><FishCard key={i.toString()+"f"} fish={fish}/></div></Col>)}
      {loading && (
                    <><Col></Col><Col><span className="spinner-border spinner-border-sm"></span></Col></>
                )}
      {!loading && currentUser && currentUser.editor && <AddFishForm />}</Row>
    </div>
  )
}

export default FishIndex