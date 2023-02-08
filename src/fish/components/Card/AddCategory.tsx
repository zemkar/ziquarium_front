import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addCategory, getFishCategories } from '../../actions/fishes';

const AddCategory = () => {
    const dispatch: any = useAppDispatch();
    const [newCategory, setNewCategory] = useState<string>('');
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const createNewCategory = () => {
        setLoading(true)
        dispatch(addCategory(newCategory))
            .then((res: any) => {
                console.log("AddCard - createNewCategory Response", res.data)
                dispatch(getFishCategories())
                setLoading(false)
            },
                (err: any) => {
                    setLoading(false)
                    console.log("AddCard - createNewCategory Error", err)
                    if (err.response.status === 400) {
                        setError(err.response.data)
                    }
                }
            )
    }

    useEffect(() => {
        if (error) {
            setError(null)
        }
    }, [newCategory])
    

    return (
        <div className="gap-1">
            <input type="text" onChange={(e) => setNewCategory(e.target.value)} className={`form-control ${error ? 'is-invalid' : ''}`} />
            {error ? <div className="invalid-feedback">{error.name}</div> : <br/>}
            <button className="btn btn-primary btn-block gap-1" onClick={createNewCategory} disabled={loading}>
                {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                Add new category
            </button>
            
        </div>
    )
}

export default AddCategory