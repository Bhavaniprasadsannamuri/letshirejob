import React from 'react'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, Stack, useTheme, Card, CardActions } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const JobCard = ({ job }) => {
    const { palette } = useTheme();
    const { jobTitle, location, description, salary } = job;
    return (
        <>
            <Card sx={{ minWidth: 275, mt: 3 }}>
                <CardContent   >
                    <Typography sx={{ textAlign: "start", color: palette.secondary.main, fontSize: 20, fontWeight: 600 }}>
                        {jobTitle}
                    </Typography>
                    <Stack direction="row" spacing="3 " alignItems="center" sx={{ mt: 1.5 }} >
                        <Stack direction="row" alignItems="center" spacing="1" >
                            <IconButton><LocationOnIcon sx={{ color: palette.primary.main, fontSize: 16 }}></LocationOnIcon></IconButton>
                            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 400 }}>
                                {location}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing="1">
                            <IconButton>
                                <CurrencyRupeeIcon sx={{ color: palette.primary.main, fontSize: 16 }}></CurrencyRupeeIcon></IconButton>
                            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 400 }}>
                                {salary}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Typography sx={{ textAlign: "start", mb: 1.5, mt: 2, fontWeight: 600, fontSize: 16, color: palette.primary.main, }}>Roles & responsibilities:</Typography>
                    <Typography variant="body2" sx={{ textAlign: "start", fontWeight: 400, fontSize: 14 }}>
                        {description.split(" ").slice(0, 15).join(" ") + "..."}

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" to={"/job/:id"}>Apply</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default JobCard
