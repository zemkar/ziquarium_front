import React from 'react'

import Modal from 'react-bootstrap/Modal';

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideLogOut } from '../actions/loginLogoutShow';
import { logout } from '../actions/auth';
import { clearPlants } from "../../plants/actions/plants";
import { userTokens } from '../interfaces';
import { clearFishes } from '../../fish/actions/fishes';

const LogoutComponent = () => {


    const { isLogOutShow } = useAppSelector(state => state.authReducers.loginLogoutShow);
    const dispatch: any = useAppDispatch();

    const handlerLogout = (event: any) => {
        event.preventDefault();
        var userTokens: userTokens;
        var accessToken: string | null = localStorage.getItem("access")
        var refreshToken: string | null = localStorage.getItem("refresh")
        if (accessToken && refreshToken) { userTokens = {access: accessToken, refresh: refreshToken} }
        else { userTokens = { access: "", refresh: "" } }

        dispatch(logout(userTokens));
        dispatch(hideLogOut());
            dispatch(clearPlants());
            dispatch(clearFishes())
    }

const handlerNoLogout = (event: any) => {
    event.preventDefault();
    dispatch(hideLogOut());
}

return (
    <>

        <Modal
            show={isLogOutShow}
            onHide={() => dispatch(hideLogOut())}
            dialogClassName="modal-90w"
            aria-labelledby="modal-change"
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="modal-change">
                    <strong> LogOut </strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure?</p>
                <form>
                    <button onClick={handlerLogout} type='submit' className="btn btn-primary btn-block" name='choice' value="yes">
                        <span>Logout</span>
                    </button>
                    <button onClick={handlerNoLogout} type='submit' className="btn btn-primary" name='choice' value="no">No</button>

                </form>

            </Modal.Body>
        </Modal>

    </>
)
}


export default LogoutComponent