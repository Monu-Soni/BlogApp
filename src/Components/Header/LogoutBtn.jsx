import { logOut } from '../../Store/authSlice'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../appwrite/Auth'
import { useDispatch } from 'react-redux'
import { Button as Btn } from '../index'

function Button() {
    const Dispatch = useDispatch()
    const Navigate = useNavigate()

    const Logout = () => {
        AuthService.logout().then(() => { Dispatch(logOut()) })
        Navigate("/")
    }

    return (<Btn onClick={Logout} className="hover:text-white">Log Out</Btn>)
}

export default Button
