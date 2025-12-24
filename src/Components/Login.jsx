import { useNavigate, Link } from 'react-router-dom'
import { logIn } from "../Store/authSlice"
import AuthService from '../appwrite/Auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Input } from './index'
import { useState } from 'react'

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, seterror] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Login = async (data) => {
        seterror("")
        try {
            const session = await AuthService.Login(data)
            if (session) {
                const userData = await AuthService.getCurrentUser()
                if (userData) dispatch(logIn(userData))
                navigate("/")
            }
        } catch (error) { seterror(error.message) }
    }

    return (
        <form onSubmit={handleSubmit(Login)} className='flex flex-wrap justify-center content-center m-1 min-h-[85vh]'>
            <div className='bg-[#106EBE] text-[#0FFCBE]  p-6 rounded-2xl w-4/5 md:w-2/5 h-[28rem]'>
                <p className="mt-2 text-base text-[#0FFCBE] text-center">
                    Don&apos;t have any account?&nbsp;
                    <Link to="/signup"
                        className="font-medium text-primary hover:underline transition-all duration-200">
                        Sign Up
                    </Link>
                </p>
                <div className='relative'>
                    <Input label={"Email"} type={"email"} {...register("email", { required: "email is required" })} />
                    {errors.email &&
                        <span className='absolute top-1/2 left-4 text-red-600 text-sm z-0'>{errors.email.message}</span>}
                </div>
                <div className='relative'>
                    <Input label={"Password"} type={"password"} {...register("password",
                        { required: "password is required" })} />
                    {errors.password &&
                        <span className='absolute top-1/2 left-4 text-red-600 text-sm z-0'>{errors.password.message}</span>}
                </div>
                <div className='text-center mt-8'>
                    <Button type='submit' className="text-[#106EBE] bg-[#0FFCBE] hover:bg-white hover:text-[#106EBE] rounded-full px-6 py-1">Submit</Button>
                </div>
            </div>
        </form>
    )
}

export default Login