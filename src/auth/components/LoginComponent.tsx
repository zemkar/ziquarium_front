import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideLogin, showLogin } from '../actions/loginLogoutShow';
import { login } from "../actions/auth";


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userLoginData } from '../interfaces';


const LoginComponent = () => {

    const DEF_PASS = "" // for test & debug

    const [loading, setLoading] = useState<boolean>(false);

    const { isLoginShow } = useAppSelector(state => state.loginLogoutShow);

    const dispatch: any = useAppDispatch();


    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must not exceed 20 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<userLoginData>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: userLoginData) => {
        setLoading(true);
        console.log(data);
        dispatch(login(data.username, data.password))
            .then((res: any) => {
                dispatch(hideLogin());
                setLoading(false);
                console.log("Logged In \n", res);
            })
            .catch((res: any) => {
                dispatch(showLogin());
                setLoading(false);
                console.log("NOT Logged In \n", res);
            });
    };

    return (
        <>
            <Modal
                show={isLoginShow}
                onHide={() => dispatch(hideLogin())}
                dialogClassName="modal-90w"
                aria-labelledby="modal-change"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-change">
                        <strong> Login </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">

                            <label className='form-label'>Username</label>
                            <input type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>

                            <label className='form-label'>Password</label>
                            <input type="password" {...register('password')} defaultValue={DEF_PASS} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>

                            <br />
                            <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginComponent;