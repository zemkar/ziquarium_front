import React, { useEffect } from 'react'

import Modal from 'react-bootstrap/Modal';

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideLogOut } from '../actions/loginLogoutShow';
import { logout } from '../actions/auth';
import { userTokens } from '../interfaces';

const LogoutComponent = () => {


    const { isLogOutShow } = useAppSelector(state => state.loginLogoutShow);
    const dispatch: any = useAppDispatch();

    useEffect(() => {
        console.log("logout - isLogoutShow", isLogOutShow);
    }, [isLogOutShow])



    const handlerLogout = (event: any) => {
        event.preventDefault();
        console.log("logout");

        var userTokens: userTokens;
        var accessToken: string | null = localStorage.getItem("access")
        var refreshToken: string | null = localStorage.getItem("refresh")
        if (accessToken && refreshToken) { userTokens = {access: accessToken, refresh: refreshToken} }
        else { userTokens = { access: "", refresh: "" } }

        dispatch(logout(userTokens));
        dispatch(hideLogOut());

        console.log("Logged Out \n");
    }





const handlerNoLogout = (event: any) => {
    event.preventDefault();
    console.log("no logout");
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