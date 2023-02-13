import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const TankIndex = () => {
  
  const dispatch: any = useAppDispatch()

  
  const { fishes, plants } = useAppSelector(state => state.tankReducer.tank);

  useEffect(() => {console.log("fishes:", fishes, "\n plants:", plants)
  }, [fishes, plants])
  

  return (
    <div>TankIndex</div>
  )
}

export default TankIndex