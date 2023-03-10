import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { compressorUsed, filterUsed, light, tankDimensions } from '../interfaces';
import { colors, compressors, filters } from '../service/constants'
import { fillEquipment } from '../actions/tankEquipment';

const EquipmentsPanel = () => {
    const dispatch: any = useAppDispatch();
    const { dimensions, filter, compressor, light, heater } = useAppSelector(state => state.tankReducer.tankEquipment);

    const [tankDimensions, setTankDimensions] = useState<tankDimensions>({ volume: 0, length: 0, width: 0, height: 0 })
    const tankVolumeHandler = (event: any) => { setTankDimensions({ volume: +event.target.value, length: tankDimensions.length, width: tankDimensions.width, height: tankDimensions.height }) };
    const tankLengthHandler = (event: any) => { setTankDimensions({ volume: tankDimensions.volume, length: +event.target.value, width: tankDimensions.width, height: tankDimensions.height }) };
    const tankWidthHandler = (event: any) => { setTankDimensions({ volume: tankDimensions.volume, length: tankDimensions.length, width: +event.target.value, height: tankDimensions.height }) };
    const tankHeightHandler = (event: any) => { setTankDimensions({ volume: tankDimensions.volume, length: tankDimensions.length, width: tankDimensions.width, height: +event.target.value }) };

    const [filterUsed, setFilterUsed] = useState<filterUsed>({ power: 0, type: 'none' })
    const filterPowerHandler = (event: any) => { setFilterUsed({ power: +event.target.value, type: filterUsed.type }) };
    const filterTypeHandler = (event: any) => { setFilterUsed({ power: filterUsed.power, type: event.target.value }) };

    const [compressorUsed, setCompressorUsed] = useState<compressorUsed>({ power: 0, volume: 0 })
    const compressorHandler = (event: any) => { setCompressorUsed(JSON.parse(event.target.value)) }

    const [lightUsed, setLightUsed] = useState<light>({ power: 0, lumen: 0, color: 'none' })
    const lightPowerHandler = (event: any) => { setLightUsed({ power: +event.target.value, lumen: lightUsed.lumen, color: lightUsed.color }) };
    const lightLumenHandler = (event: any) => { setLightUsed({ power: lightUsed.power, lumen: +event.target.value, color: lightUsed.color }) };
    const lightColorHandler = (event: any) => { setLightUsed({ power: lightUsed.power, lumen: lightUsed.lumen, color: event.target.value }) };

    const [heaterUsed, setHeaterUsed] = useState<boolean>(false)
    const heaterCheckHandler = () => { setHeaterUsed(!heaterUsed) }

    const saveTankProperties = () => {
        var tankProps = {
            dimensions: tankDimensions,
            filter: filterUsed,
            compressor: compressorUsed,
            light: lightUsed,
            heater: heaterUsed
        }
        // console.log("to save:", tankProps)
        dispatch(fillEquipment(tankProps));
        localStorage.setItem('tank', JSON.stringify(tankProps))
    }

    const restoreTankProperties = () => {
        
        var tankProps: any = localStorage.getItem('tank');
        if (tankProps) {
            tankProps = JSON.parse(tankProps);
            // console.log("tank props restored", tankProps);
            
        setTankDimensions(tankProps.dimensions);
        setFilterUsed(tankProps.filter);
        setCompressorUsed(tankProps.compressor);
        setLightUsed(tankProps.light);
        setHeaterUsed(tankProps.heater);
        }
    
    }

    useEffect(() => {
        // console.log("tank props reloaded", dimensions);
        setTankDimensions(dimensions);
        setFilterUsed(filter);
        setCompressorUsed(compressor);
        setLightUsed(light);
        setHeaterUsed(heater);
    }, [dimensions, filter, compressor, light, heater])

    return (
        <div>
            Volume of tank: <input type='number' value={tankDimensions.volume} min={0} onChange={tankVolumeHandler}></input> liters
            <br />
            Dimensions of tank: <br />
            Length<input type='number' value={tankDimensions.length} min={0} onChange={tankLengthHandler}></input> cm<br />
            Width<input type='number' value={tankDimensions.width} min={0} onChange={tankWidthHandler}></input> cm<br />
            Height<input type='number' value={tankDimensions.height} min={0} onChange={tankHeightHandler}></input> cm<br />
            <br />
            Compressor: <br />
            <select onChange={compressorHandler} value={JSON.stringify(compressorUsed)}>
                {compressors.map((e: any) => { return (<option key={e.power} value={JSON.stringify(e)}>{e.power} Watt - {e.volume} l/h</option>) })}
            </select>
            <br />
            Filter:   <br />
            output: <select onChange={filterPowerHandler}>
                {filters.volume.map((e: any) => { return <option key={e} value={e}>{e}</option> })}
            </select> l/h
            type: <select onChange={filterTypeHandler}>
                {filters.type.map((e: any, i: number) => { return <option key={i} value={i}>{e}</option> })}
            </select>
            <br />
            Light: <br />
            power: <input type='number' onChange={lightPowerHandler} value={lightUsed.power} min={0} /> Watt<br />
            color: <select onChange={lightColorHandler} value={lightUsed.color}>
                {colors.map((e: any, i: number) => { return <option key={i} value={e}>{e}</option> })}
            </select><br />
            lumen: <input type='number' onChange={lightLumenHandler} value={lightUsed.lumen} min={0} /> Lumen
            <br />
            Heater:  <input
                type="checkbox"
                id="checkboxHeater"
                checked={heaterUsed}
                onChange={heaterCheckHandler}
            />
            <br /><br />
            <button onClick={saveTankProperties}>Save tank properties</button>
            <button onClick={restoreTankProperties}>Restore tank properties</button>
        </div>
    )
}

export default EquipmentsPanel