import React from 'react';
import { getFishes } from '../../fish/actions/fishes';
import { getPlants } from '../../plants/actions/plants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeFishAmount, changePlantAmount, removeFishesFromTank, removePlantsFromTank } from '../actions/tankFilling';
import { itemInTank } from '../interfaces';
import EquipmentsPanel from './EquipmentsPanel';

const TankIndex = () => {
  const dispatch: any = useAppDispatch();


  const { fishes, plants } = useAppSelector(state => state.tankReducer.tank); // selected fishes & plants
  const { fishList } = useAppSelector(state => state.fishesReducer.fishes); // fish in DB
  if (!fishList) {
    dispatch(getFishes())
  }
  const { plantList } = useAppSelector(state => state.plantsReducer.plants); // plants in DB
  if (!plantList) {
    dispatch(getPlants())
  }

  const changeAmount = (isFish: boolean, id: number, amount: number, itemValue: number) => {
    console.log("changeAmount", id, amount, itemValue);
    if (id && (amount || amount === 0) && (itemValue || itemValue === 0)) {
      if (amount >= 0) {
        if (isFish) {
          dispatch(changeFishAmount(id, amount, itemValue))
        } else {
          dispatch(changePlantAmount(id, amount, itemValue))
        }
      }
    }
  }

  const clearFishList = () => {
    dispatch(removeFishesFromTank())
  }

  const clearPlantsList = () => {
    dispatch(removePlantsFromTank())
  }

  return (
    <div>
      <EquipmentsPanel />
      <hr />
      {fishList && <div className='fishPanel'>
        {fishes?.length > 0 ? <button onClick={clearFishList} >Remove all fish</button> : "No fish in tank"}
        {fishes && fishes.map((fishInTank: itemInTank, i: number) => {
          var fishInList = fishList?.filter((fishFromList: any) => { return fishFromList.id === fishInTank.id })[0]
          console.log("TankIndex - fish in map:", fishInTank, "\n fish:", fishInList);
          return (<p key={i}>
            {fishInTank.id + ") " + fishInList?.name + " " + fishInTank.amount + " pts."}
            <button onClick={() => changeAmount(true, fishInTank.id, fishInTank.amount - 5, fishInTank.value || 0)} disabled={(fishInTank === undefined) || (fishInTank.amount < 6)}>-5</button>
            <button onClick={() => changeAmount(true, fishInTank.id, fishInTank.amount - 1, fishInTank.value || 0)} disabled={(fishInTank === undefined) || (fishInTank.amount < 2)}>-1</button>
            <input type='number' value={fishInTank.amount || 0} onChange={(e) => { changeAmount(true, fishInTank.id, +e.target.value, fishInTank.value || 0) }} min={1}></input>
            <button onClick={() => changeAmount(true, fishInTank.id, (fishInTank.amount + 1) || 1, fishInTank.value || 0)} >+1</button>
            <button onClick={() => changeAmount(true, fishInTank.id, (fishInTank.amount + 5) || 5, fishInTank.value || 0)} >+5</button>
            <button onClick={() => changeAmount(true, fishInTank.id, 0, fishInTank.value || 0)} >Remove</button>
          </p>)
        })}
      </div>}
      <hr />
      { plantList && <div className='plantsPanel'>
        {plants?.length > 0 ? <button onClick={clearPlantsList} >Remove all plants</button> : "No plants in tank"}
        {plants && plants.map((plantInTank: itemInTank, i: number) => {
          var plantInList = plantList?.filter((plantFromList: any) => { return plantFromList.id === plantInTank.id })[0]
          return <p key={i}>{plantInTank.id + ") "+ plantInList.name + " " + plantInTank.amount + " pts."}
          <button onClick={() => changeAmount(false, plantInTank.id, plantInTank.amount - 5, plantInTank.value || 0)} disabled={(plantInTank === undefined) || (plantInTank.amount < 6)}>-5</button>
          <button onClick={() => changeAmount(false, plantInTank.id, plantInTank.amount - 1, plantInTank.value || 0)} disabled={(plantInTank === undefined) || (plantInTank.amount < 2)}>-1</button>
          <input type='number' value={plantInTank.amount || 0} onChange={(e) => { changeAmount(false, plantInTank.id, +e.target.value, plantInTank.value || 0) }} min={1}></input>
          <button onClick={() => changeAmount(false, plantInTank.id, (plantInTank.amount + 1) || 1, plantInTank.value || 0)} >+1</button>
          <button onClick={() => changeAmount(false, plantInTank.id, (plantInTank.amount + 5) || 5, plantInTank.value || 0)} >+5</button>
          <button onClick={() => changeAmount(false, plantInTank.id, 0, plantInTank.value || 0)} >Remove</button>
          </p>
        })}
      </div>}
      <hr />
    </div>
  )
}

export default TankIndex