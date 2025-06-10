import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import AddJob from './AddJob';

const AdminJobs = () => {
    const [showmodel, setShowModel] = useState(false);
    const handleToggle = () => {
        setShowModel(previous => !previous);
    }
    return (
        <div>
            {/* <p>admin created jobs</p> */}
            <Button variant='contained' onClick={handleToggle} sx={{ textTransform: 'capitalize', textAlign: "right", mb: 2 }}>
                Add Job
            </Button>

            <Box sx={{ display: showmodel ? "block" : "none", transition: "display 1s" }}><AddJob close={handleToggle}></AddJob> </Box>

        </div>
    );
};

export default AdminJobs;
