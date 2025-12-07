import { useNavigate, Link } from 'react-router-dom'
import AuthService from '../appwrite/Auth'
import { logIn } from '../Store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Input } from './index'
import { useState } from 'react'

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm()
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
        <form onSubmit={handleSubmit(Signup)} className='bg-[#106EBE] text-[#0FFCBE] mx-auto mt-8 mb-8 rounded-2xl w-4/5 md:w-1/2 h-96'>
            <div className='p-6'>
                <p className="mt-2 text-base text-[#0FFCBE] text-center">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-primary hover:underline transition-all duration-200">
                        Log In
                    </Link>
                </p>
                <div className='relative'>
                    <Input label={"Name"} type={"text"} {...register("name", { required: "name is required" })} />
                    {errors.name &&
                        <span className='absolute top-1/2 left-4 text-red-600 text-sm z-0'>{errors.name.message}</span>}
                </div>
                <div className='relative'>
                    <Input label={"Email"} type={"email"} {...register("email", { required: "email is required" },)} />
                    {errors.email &&
                        <span className='absolute top-1/2 left-4 text-red-600 text-sm z-0'>{errors.email.message}</span>}
                </div>
                <div className='relative'>
                    <Input label={"Password"} type={"password"} {...register("password",
                        { required: "password is required" })} />
                    {errors.password &&
                        <span className='absolute top-1/2 left-4 text-red-600 text-sm z-0'>{errors.password.message}</span>}
                </div>
            </div>
            <div className='text-center'>
                <Button type='submit' className="text-[#106EBE] bg-[#0FFCBE] hover:bg-white hover:text-[#106EBE] rounded-full px-6 py-1">Submit</Button>
            </div>
        </form>
    )
}

export default Signup