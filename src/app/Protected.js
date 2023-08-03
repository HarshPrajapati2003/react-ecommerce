import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom'
const Protected = ({children}) => {
    const user = useSelector(selectLoggedInUser)
    if(!user){
        return <Navigate to="/login" replace={true}></Navigate>
    }
  return children
}

export default Protected
