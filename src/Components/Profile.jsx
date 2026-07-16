import { useEffect, useState } from "react";
import AuthService from "../appwrite/Auth"

const Profile = () => {

    const [userData, setuserData] = useState(null)

    useEffect(() => {
        const getdata = async () => {
            let user = await AuthService.getCurrentUser()
            setuserData(user)
        }
        getdata()
    }, [])
    if (!userData) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>

            {userData.name}
            </h1>
        </div>
    )
}

export default Profile
