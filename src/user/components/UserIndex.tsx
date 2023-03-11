import React from 'react'
import { Modal } from 'react-bootstrap'
import Profile from './Profile'
import UserOrders from './UserOrders'

const UserIndex = () => {
  return (
    <div className='profile-block'><Profile /><UserOrders />
    
    
    </div>

  )
}

export default UserIndex