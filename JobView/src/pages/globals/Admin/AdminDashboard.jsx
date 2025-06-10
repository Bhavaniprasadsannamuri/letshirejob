import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails } from '../../../redux/slices/UserSlice'

const AdminDashboard = () => {
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
            <p>admin dashboard</p>

        </div>
    )
}

export default AdminDashboard
