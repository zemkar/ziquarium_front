import React, { useEffect, useState } from 'react'
import { useAppDispatch} from "../../../store/hooks";
import { addCategory, getFishCategories } from '../../actions/fishes';
import { hideAddCategoryWindow } from '../../actions/fishModals';

const AddCategory = () => {
    const dispatch: any = useAppDispatch();
    const [newCategory, setNewCategory] = useState<string>('');
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const createNewCategory = () => {
        setLoading(true)
        if (newCategory !== '') {
            dispatch(addCategory(newCategory))
                .then((res: any) => {
                    dispatch(getFishCategories())
                    setLoading(false)
                    dispatch(hideAddCategoryWindow())
                },
                    (err: any) => {
                        setLoading(false)
                        // console.log("AddCard - createNewCategory Error", err)
                        if (err.response.status === 400) {
                            setError(err.response.data)
                        }
                    }
                )
        }
        else {
            setError({ name: "unable to add category without name" });
            setLoading(false);
        }
    }

    useEffect(() => {
        if (error) {
            setError(null)
        }
    }, [newCategory, error])


    return (
        <div className="gap-1">
            <input type="text" onChange={(e) => setNewCategory(e.target.value)} className={`form-control ${error ? 'is-invalid' : ''}`} />
            {error ? <div className="invalid-feedback">{error.name}</div> : <br />}
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