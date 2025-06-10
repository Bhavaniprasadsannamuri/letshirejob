import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails } from '../../redux/slices/UserSlice'

const UserDashboard = () => {
    const dispatch = useDispatch();
    const { user, error } = useSelector((state) => state.userInformation);

    useEffect(() => {
        dispatch(userDetails());
        console.log("userdashboard page", user, "error", error);

    }, [dispatch])
    useEffect(() => {
        // dispatch(userDetails());
        console.log("userdashboard page", user, "error", error);

    }, [user, error])

    return (
        <div>

            <p>user dashboard</p>
        </div>
    )
}

export default UserDashboard
