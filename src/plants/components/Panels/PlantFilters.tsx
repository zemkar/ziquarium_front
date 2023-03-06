import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addPlantsFilter } from '../../actions/plantsFilter';
import { plantCategory } from '../../interfaces';



const PlantFilters = () => {
  const dispatch: any = useAppDispatch();
  const { plantsCategories } = useAppSelector(state => state.plantsReducer.plantsCategories);
  const { categoryFilter } = useAppSelector(state => state.plantsReducer.plantFilters);

  const categoryChanger = (category: string) => {
    dispatch(addPlantsFilter({categoryFilter:category}))
  }

  useEffect(() => {
    console.log("categoryFilter", categoryFilter)
  }, [categoryFilter])
  
  return (
    <div>
      <Form.Select onChange={(e)=> categoryChanger(e.target.value)} aria-label="Select category" size="sm" defaultValue={categoryFilter || 0}>
        <option value={0}>All categories</option>
        {plantsCategories?.map((cat: plantCategory) =>
          <option key={cat.id} value={cat.id}>{cat.name}</option>)}
      </Form.Select>


    </div>
  )
}

export default PlantFilters