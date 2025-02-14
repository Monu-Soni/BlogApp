import { logOut } from '../../Store/authSlice'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../appwrite/Auth'
import { useDispatch } from 'react-redux'
import React from 'react'

function Button() {
    const Dispatch = useDispatch()
    const Navigate = useNavigate()

    const Logout = () => {
        AuthService.logout()
            .then(() => { Dispatch(logOut()) })
        Navigate("/")
    }

    return (
        <div className='inline'>
            <button onClick={Logout}
                className="px-3 py-1 mr-1 rounded-md border transition-all text-white hover:text-black hover:border-gray-600">
                Log Out
            </button>
        </div>
    )
}

export default Button
