import React from 'react'
import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'
// import RegistrationComponent from './RegistrationComponent'

const AuthIndex = () => {
  return (
    <div>
        <LoginComponent />
        <LogoutComponent />
        {/* <RegistrationComponent /> */}
    </div>
  )
}

export default AuthIndex