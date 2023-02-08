import React, { useState } from 'react'
import Card from "react-bootstrap/Card";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteFish, getFishes } from '../../actions/fishes';

const DeleteForm = (fish: { id: number }) => {

    const dispatch: any = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const delFish = () => {
        setLoading(true);
        dispatch(deleteFish(fish.id))
            .then((res: any) => {
                console.log("fish - DeleteForm - fish deleted");
                dispatch(getFishes());
            }, (err: any) => console.log("fish - DeleteForm - error", err))
            .finally(() => setLoading(false))
    }

    return (
        <Card>
            <h3 style={{ textAlign: 'center' }}>Are you sure wont delete this fish?</h3>
            <button className="btn btn-danger btn-sm"
                onClick={delFish} disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm"></span>} Delete
                
            </button>
        </Card>
    )
}

export default DeleteForm