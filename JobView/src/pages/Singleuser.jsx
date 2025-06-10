import React, { useEffect } from 'react'
import axios from "axios"

const Singleuser = () => {
    const fetchSingleUser = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/singleUser/6819097824130433dce8c86f", { withCredentials: true });
            console.log(response);
            // setJobs(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchSingleUser();
    }, [])
    return (
        <div>

        </div>
    )
}

export default Singleuser
