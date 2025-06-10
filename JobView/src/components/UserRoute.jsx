import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserRoute = ({ children }) => {
    const userInfo = useSelector((state) => state.authentication?.userInfo);
    useEffect(() => {

        console.log("in user route", userInfo);
        if (!userInfo) {
            toast.warning("Login to access the page");
        }
    }, [userInfo]);
    if (userInfo) {
        return children;
    }

    return <Navigate to="/" />
}

export default UserRoute
