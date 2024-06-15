import React from 'react'
import { Navigate } from 'react-router-dom'
Navigate
const PrivateRoute = ({children}) =>{
    return localStorage.getItem("valid") ? children : <Navigate to="/"/>
}

export default PrivateRoute