import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AuthLayout({ children, authentication = true }) {

    const authStatus = useSelector(state => state.Auth.status)
    const [loader, setLoader] = useState(true)
    const Navigate = useNavigate()

    useEffect(() => {
        if (authentication && authStatus !== authentication) { Navigate("/login") }
        else if (!authentication && authStatus !== authentication) { Navigate("/") }
        setLoader(false)
    }, [authStatus, Navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
