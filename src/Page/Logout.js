import React from 'react'
import { useDispatch } from 'react-redux'
import userSlice from '../Store/user'
import { Navigate } from 'react-router-dom'

const Logout = () => {

    const dispatch = useDispatch()

    // menghapus token dari local storage
    localStorage.removeItem('minishopAccessToken')
    // update user store menjadi null
    dispatch(userSlice.actions.removeItem())

  return (
    <Navigate to="/login" />
  )
}

export default Logout