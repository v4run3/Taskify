import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoute = ({ allowedRoles }) => {
  // For debugging, always allow access
  return <Outlet />
}

export default PrivateRoute
