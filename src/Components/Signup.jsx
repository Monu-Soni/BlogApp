import { useNavigate, Link } from 'react-router-dom'
import AuthService from '../appwrite/Auth'
import { logIn } from '../Store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Input } from './index'
import { useState } from 'react'

function Signup() {
    const { register, handleSubmit } = useForm()
    const [error, seterror] = useState("")
    const Navigate = useNavigate()
    const Dispatch = useDispatch()

    const Signup = async (data) => {
        seterror("")
        try {
            const session = await AuthService.createAccount(data)
            if (session) {
                const userData = await AuthService.getCurrentUser()
                if (userData) Dispatch(logIn(userData))
                Navigate("/")
            }
        } catch (error) { seterror(error.message) }
    }

    return (
        <form onSubmit={handleSubmit(Signup)} className='bg-white mx-auto mt-8 mb-8 rounded-2xl w-4/5 md:w-1/2 h-96'>
            <div className='p-6'>
                <p className="mt-2 text-base text-black/60 text-center">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-primary hover:underline transition-all duration-200">
                        Log In
                    </Link>
                </p>
                <Input label={"Name"} type={"text"} placeholder={"Name"}{...register("name", { required: true })} />
                <Input label={"Email"} type={"email"} placeholder={"Email"}{...register("email", { required: true })} />
                <Input label={"Password"} type={"password"} placeholder={"Password"}
                    {...register("password", { required: true })}
                />
            </div>
            <div className='m-auto w-1/6'><Button type='submit' >Submit</Button></div>
        </form>
    )
}

export default Signup