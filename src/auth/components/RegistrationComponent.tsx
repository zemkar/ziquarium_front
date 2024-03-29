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
    const [errPhone, setErrPhone] = useState([])
    const [errFName, setErrFName] = useState([])
    const [errLName, setErrLName] = useState([])
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
        phone: Yup.string()
            .notRequired()
            .max(20, "Phone number must not exceed 20 characters"),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters'),
        password2: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        first_name: Yup.string()
            .required("First name is required")
            .max(20, "First name must not exceed 20 characters"),
        last_name: Yup.string()
            .required("Last name is required")
            .max(20, "Last name must not exceed 20 characters"),
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
        setErrPhone([]);
        setErrFName([]);
        setErrLName([]);


        dispatch(registration(data))
            .then((res: any) => {
                setSuccessful(true);
                dispatch(login(data.username, data.password))
                    .then((res: any) => {
                        setLoading(false);
                        navigate('/profile');
                    })
            })
            .catch((err: any) => {
                setSuccessful(false);
                setLoading(false);
                if (err.email) {
                    setErrEmail(err.email)
                }
                if (err.phone) {
                    setErrPhone(err.phone)
                }
                if (err.username) {
                    setErrUsername(err.username)
                }
                if (err.password) {
                    setErrPassword(err.password)
                }
                if (err.password2) {
                    setErrPassword2(err.password2)
                }
                if (err.first_name) {
                    setErrFName(err.first_name)
                }
                if (err.last_name) {
                    setErrLName(err.last_name)
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
                                    <label>Phone number</label>
                                    <input
                                        type="text"
                                        {...register('phone')}
                                        className={`form-control ${errors.phone || errPhone.length > 0 ? 'is-invalid' : ''}`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.phone?.message}
                                        {errPhone.length > 0 && errPhone.map((err, i) => <div key={i} >{err}</div>)}
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
                                        {...register('first_name', { pattern: /^[A-Za-z]/i })}
                                        className={`form-control ${errors.first_name || errFName.length > 0 ? 'is-invalid' : ''
                                    }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.first_name?.message}
                                        {errFName.length > 0 && errFName.map((err, i) => <div key={i}>{err}</div>)}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Last name</label>
                                    <input type="text"
                                        {...register('last_name', { pattern: /^[A-Za-z]/i })}
                                        className={`form-control ${errors.last_name || errLName.length > 0 ? 'is-invalid' : ''
                                    }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.last_name?.message}
                                        {errLName.length > 0 && errLName.map((err, i) => <div key={i}>{err}</div>)}
                                    </div>
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
