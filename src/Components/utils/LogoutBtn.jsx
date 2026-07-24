import { useNavigate } from "react-router-dom"
import { logOut } from "../../Store/authSlice"
import AuthService from "../../appwrite/Auth"
import { useDispatch } from "react-redux"
import { Button as Btn } from "../index"

export default function Button() {
    const Dispatch = useDispatch()
    const Navigate = useNavigate()

    const Logout = () => {
        AuthService.logout().then(() => { Dispatch(logOut()) })
        Navigate("/")
    }
    return (<Btn className={"text-red-600"} onClick={Logout}>Log Out</Btn>)
}