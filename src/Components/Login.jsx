import { useNavigate, Link } from 'react-router-dom'
import { logIn } from "../Store/authSlice"
import AuthService from '../appwrite/Auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Input } from './index'
import React, { useState } from 'react'

function Login() {

    const { register, handleSubmit } = useForm()
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
        } catch (error) { seterror(console.error(error.message)) }
    }

    return (
        <form onSubmit={handleSubmit(Login)} className='bg-white mx-auto mt-8 mb-8 rounded-2xl w-4/5 md:w-1/2 h-96'>
            <div className='p-6'>
                <p className="mt-2 text-base text-black/60 text-center">
                    Don&apos;t have any account?&nbsp;
                    <Link to="/signup"
                        className="font-medium text-primary hover:underline transition-all duration-200">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="mt-8 text-center text-red-600">{error}</p>}
                <Input label={"Email"} type={"email"} placeholder={"Email"}
                    {...register("email", { required: true })}
                />
                <Input label={"Password"} type={"password"} placeholder={"Password"}
                    {...register("password", { required: true })}
                />
            </div>
            <div className='m-auto w-1/6'><Button type='submit' >Submit</Button></div>

        </form>
    )
}

export default Login