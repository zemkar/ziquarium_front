import React from 'react'
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addFishFilter } from '../../actions/fishFilter';
import { fishCategory } from '../../interfaces';



const FishFilters = () => {
  const dispatch: any = useAppDispatch();
  const { fishCategories } = useAppSelector(state => state.fishesReducer.categories);
  const { categoryFilter } = useAppSelector(state => state.fishesReducer.fishFilters);

  const categoryChanger = (category: string) => {
    dispatch(addFishFilter({categoryFilter:category}))
  }
  
  return (
    <div>
      <Form.Select onChange={(e)=> categoryChanger(e.target.value)} aria-label="Select category" size="sm" defaultValue={categoryFilter || 0}>
        <option value={0}>All categories</option>
        {fishCategories?.map((cat: fishCategory) =>
          <option key={cat.id} value={cat.id}>{cat.name}</option>)}
      </Form.Select>


    </div>
  )
}

export default FishFilters