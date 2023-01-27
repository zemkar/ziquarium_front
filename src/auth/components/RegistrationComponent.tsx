import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../../store/hooks";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { login, register as registration } from "../actions/auth";
import { userRegistrationData } from '../interfaces';
import "../auth.css";

const RegistrationComponent = () => {


    let navigate = useNavigate();

    const dispatch: any = useAppDispatch();

    const [errUsername, setErrUsername] = useState([])
    const [errPassword, setErrPassword] = useState([])
    const [errPassword2, setErrPassword2] = useState([])
    const [errEmail, setErrEmail] = useState([])
    const [successful, setSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);


    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters'),
        password2: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        first_name: Yup.string(),
        last_name: Yup.string(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<userRegistrationData>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: userRegistrationData) => {


        setLoading(true);
        setSuccessful(false);

        setErrUsername([]);
        setErrPassword([]);
        setErrPassword2([]);
        setErrEmail([]);



        dispatch(registration(data))
            .then((res: any) => {
                setSuccessful(true);
                console.log("Registration \n register=>login \n response: ", res);
                dispatch(login(data.username, data.password))
                    .then((res: any) => {
                        setLoading(false);
                        console.log("Registered & Logged In \n", res);
                        navigate('/profile');
                    })
            })
            .catch((err: any) => {
                setSuccessful(false);
                setLoading(false);
                console.log("ERR", err);
                if (err.email) {
                    setErrEmail(err.email)
                    console.log("ERROR: email\n", err.email)
                }
                if (err.username) {
                    setErrUsername(err.username)
                    console.log("ERROR: username\n", err.username)
                }
                if (err.password) {
                    setErrPassword(err.password)
                    console.log("ERROR: password\n", err.password)
                }
                if (err.password2) {
                    setErrPassword2(err.password2)
                    console.log("ERROR: password2\n", err.password2)
                }
            })


    };

    return (
        <div className='RegisterForm'>
            <div className="col-md-12">
                <div className="card card-container">
                    <div>Registration</div>
                    <hr />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        {...register('username')}
                                        className={`form-control ${errors.username || errUsername.length > 0 ? 'is-invalid' : ''}`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.username?.message}
                                        {errUsername.length > 0 && errUsername.map((err, i) => <div key={i} >{err}</div>)}
                                    </div>


                                </div>

                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="text"
                                        {...register('email')}
                                        className={`form-control ${errors.email || errEmail.length > 0 ? 'is-invalid' : ''}`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.email?.message}
                                        {errEmail.length > 0 && errEmail.map((err, i) => <div key={i} >{err}</div>)}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        {...register('password')}
                                        className={`form-control ${errors.password || errPassword.length > 0 ? 'is-invalid' : ''}`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.password?.message}
                                        {errPassword.length > 0 && errPassword.map((err, i) => <div key={i} >{err}</div>)}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Repeat password</label>
                                    <input
                                        type="password"
                                        {...register('password2')}
                                        className={`form-control ${errors.password2 || errPassword2.length > 0 ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.password2?.message}
                                        {errPassword2.length > 0 && errPassword2.map((err, i) => <div key={i}>{err}</div>)}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>First name</label>
                                    <input type="text"
                                        className="form-control"
                                        {...register('first_name', { pattern: /^[A-Za-z]/i })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Last name</label>
                                    <input type="text"
                                        className="form-control"
                                        {...register('last_name', { pattern: /^[A-Za-z]/i })}
                                    />
                                </div><br />

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" disabled={loading}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Sign Up</span>
                                    </button>
                                </div></div>

                        )}
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistrationComponent
