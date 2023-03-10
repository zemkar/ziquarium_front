import React from 'react'
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeFishAmount } from '../../../tank/actions/tankFilling';
import { getFishes } from '../../actions/fishes';

const ChangeAmount = () => {

  const dispatch: any = useAppDispatch();

  const { isInTankAmountShow } = useAppSelector(state => state.fishesReducer.fishModals);
  const { fishes } = useAppSelector(state => state.tankReducer.tank);
  const { fishList } = useAppSelector(state => state.fishesReducer.fishes);
  if (!fishList) dispatch(getFishes())
  const fishId = isInTankAmountShow?.fishId;

  var fish = fishes[fishes.findIndex((e:any) => {return +e.id === +fishId})];
  
  var data:any = fishList?.filter((e:any) => {return e.id === fishId})[0];

  const changeAmount = (val: number) => {
    // console.log("data", data, fishList);
    
    if (val >= 0) {
      if (fishId) dispatch(changeFishAmount(fishId, val, data.fish_value))}
  }
  
  return (
    <div style={{textAlign:"center"}}>
      <h3>Now in tank <b>{fish?.amount} {fish?.value * fish?.amount}</b></h3>
      <div>
        
      <br/>
      <button onClick={() => changeAmount(fish?.amount - 5)} disabled={ (fish === undefined) || (fish?.amount < 5)}>-5</button>
      <button onClick={() => changeAmount(fish?.amount - 1)} disabled={ (fish === undefined) || (fish?.amount < 1)}>-1</button>
      <input type='number' value={fish?.amount || 0} onChange={(e) => {changeAmount(+e.target.value)}}  min={0}></input>
      <button  onClick={() => changeAmount((fish?.amount + 1)||1)} >+1</button>
      <button  onClick={() => changeAmount((fish?.amount + 5)||5)} >+5</button>
      <br/>
      <br/>
      <br/>
      </div>

    </div>
  )
}

export default ChangeAmount