import React from 'react'
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changePlantAmount } from '../../../tank/actions/tankFilling';
import { getPlants } from '../../actions/plants';

const ChangeAmount = () => {

  const dispatch: any = useAppDispatch();

  const { isInTankAmountShow } = useAppSelector(state => state.plantsReducer.plantModals);
  const { plants } = useAppSelector(state => state.tankReducer.tank);
  const { plantList } = useAppSelector(state => state.plantsReducer.plants);
  if (!plantList) dispatch(getPlants)
  const plantId = isInTankAmountShow?.plantId;

  var plant = plants[plants.findIndex((e:any) => {return +e.id === +plantId})];
  
  var data:any = plantList?.filter((e:any) => {return e.id === plantId})[0];

  const changeAmount = (val: number) => {
    // console.log("data", data, plantList);
    
    if (val >= 0) {
      if (plantId) dispatch(changePlantAmount(plantId, val, data?.plant_value | 0))}
  }
  
  return (
    <div style={{textAlign:"center"}}>
      <h3>Now in tank <b>{plant?.amount} {plant?.value * plant?.amount}</b></h3>
      <div>
        
      <br/>
      <button onClick={() => changeAmount(plant?.amount - 5)} disabled={ (plant === undefined) || (plant?.amount < 5)}>-5</button>
      <button onClick={() => changeAmount(plant?.amount - 1)} disabled={ (plant === undefined) || (plant?.amount < 1)}>-1</button>
      <input type='number' value={plant?.amount || 0} onChange={(e) => {changeAmount(+e.target.value)}}  min={0}></input>
      <button  onClick={() => changeAmount((plant?.amount + 1)||1)} >+1</button>
      <button  onClick={() => changeAmount((plant?.amount + 5)||5)} >+5</button>
      <br/>
      <br/>
      <br/>
      </div>

    </div>
  )
}

export default ChangeAmount