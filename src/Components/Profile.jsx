import { useEffect, useState } from "react";
import AuthService from "../appwrite/Auth"
import { LogoutBtn } from "./index"
import { useSelector } from 'react-redux'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, } from "react-icons/fa";


const Profile = () => {
    const authStatus = useSelector((state) => state.Auth.status)
    const user = {
        name: "Amit Kumar",
        email: "amit@example.com",
        avatar: "https://i.pravatar.cc/200",
        followers: 245,
        following: 180,
        social: {
            github: "https://github.com/amit",
            linkedin: "https://linkedin.com/in/amit",
            twitter: "https://twitter.com/amit",
            instagram: "https://instagram.com/amit",
        },
    };

    const [userData, setuserData] = useState(null)

    useEffect(() => {
        const getdata = async () => {
            let user = await AuthService.getCurrentUser()
            setuserData(user)
        }
        getdata()
    }, [])
    let User = userData

    if (User) {
        return (
            <div className="bg-slate-100 flex items-center justify-center p-6">
                <div className=" w-full max-w-md space-y-6">
                    <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6">
                        <img src={user.avatar} alt={User.name} className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover" />
                        <h2 className="mt-4 text-2xl font-bold text-gray-800">{User.name}</h2>
                        <p className="text-gray-500">{User.email}</p>
                    </div>
                    <div className="grid grid-cols-2 divide-x text-center bg-white rounded-2xl shadow-lg p-6">
                        <div>
                            <h3 className="text-3xl font-bold text-blue-600">{user.followers}</h3>
                            <p className="text-gray-500 mt-1">Followers</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-green-600">{user.following}</h3>
                            <p className="text-gray-500 mt-1">Following</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Connect with Me</h3>
                        <div className="flex justify-center gap-6">
                            <a href={user.social.github} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-black transition">
                                <FaGithub size={28} />
                            </a>

                            <a href={user.social.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:scale-110 transition">
                                <FaLinkedin size={28} />
                            </a>

                            <a href={user.social.twitter} target="_blank" rel="noreferrer" className="text-sky-500 hover:scale-110 transition">
                                <FaTwitter size={28} />
                            </a>

                            <a href={user.social.instagram} target="_blank" rel="noreferrer" className="text-pink-500 hover:scale-110 transition">
                                <FaInstagram size={28} />
                            </a>
                        </div>
                    </div>
                    {authStatus && (<div className='mx-4 text-center'><LogoutBtn /></div>)}
                </div>
            </div>
        )
    }
    return <div>Loading...</div>
}

export default Profile
