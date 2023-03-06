import React, { useState } from 'react';
import { useAppDispatch } from "../../../store/hooks";
import { deletePlant, getPlants } from '../../actions/plants';
import { hidePlantModals } from '../../actions/plantsModals';

const DeleteForm = (plant: { id: number }) => {

    const dispatch: any = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const delPlant = () => {
        setLoading(true);
        dispatch(deletePlant(plant.id))
            .then((res: any) => {
                dispatch(getPlants());
            }, (err: any) => console.log("plant - DeleteForm - error", err))
            .finally(() => {
                setLoading(false);
                dispatch(hidePlantModals());
            })
    }

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>Are you sure wont delete this plant?</h3>
            <button className="btn btn-danger btn-sm"
                onClick={delPlant} disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm"></span>} Delete
                
            </button>
        </>
    )
}

export default DeleteForm