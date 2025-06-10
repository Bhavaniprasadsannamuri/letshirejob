import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails } from '../../redux/slices/UserSlice';
import { Navigate } from 'react-router-dom';


const UserInfo = () => {
    const dispatch = useDispatch();
    const { user, error } = useSelector((state) => state.userInformation);
    useEffect(() => {
        console.log("user", user, "error", error);
    }, [])
    if (!user) {
        // localStorage.removeItem("userInfo");
        console.log(localStorage.getItem("userInfo"))
        return <Navigate to="/" />
    }

    return (
        <div>
            <p>user Details</p>
            <p>Username: {user?.firstName || 'Loading...'}</p>
        </div>
    )
}

export default UserInfo

