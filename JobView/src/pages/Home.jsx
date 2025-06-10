import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import { Box, Card, Container, Stack, Typography, ListItem, ListItemIcon, MenuItem, MenuList, useTheme, } from '@mui/material'
import { showLinkedinJobs } from "../redux/slices/LinkedinJObsSlice"
// import JobComponenet from '../Compnents/JobComponenet';
// import LoadingBox from '../Compnents/LoadingBox';
// import SelectComponenet from '../Compnents/SelectComponenet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import store from '../redux/store'
import { useParams } from 'react-router-dom'
import JobCard from '../components/JobCard'
import { fetchJobTypes } from '../redux/slices/JobTypeSlice'
import SelectCategory from '../components/SelectCategory'

const Home = () => {
  // const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  // const { location } = useParams();
  const keyword = "";

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const { linkedinjobs, status, error, count, pageNumber, totalPages, locations } = useSelector((state) => state.jobs);
  const linkjobs = useSelector((state) => state.jobs);
  const { jobTypes } = useSelector((state) => state.jobcategory);

  useEffect(() => {
    dispatch(showLinkedinJobs({ page, keyword, location, category }));

  }, [dispatch, keyword, page, location, category]);
  useEffect(() => {
    dispatch(fetchJobTypes());
    // console.log("jobTypes", jobTypes);
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("Fetched jobs:", linkedinjobs, status, error, locations);
  //   // console.log("jobTypes", jobTypes);
  //   console.log("linkjobs", linkjobs);
  // }, [linkedinjobs, keyword, error, jobTypes, locations, linkjobs]);

  const handlePage = (event, value) => {
    setPage(value);
    // console.log(page);
  }
  const handleLocationClick = (location) => {
    setLocation(location);
  }
  const handleCategory = (event) => {
    setCategory(event.target.value);
    // console.log("category", category);
    setPage(1);
  }

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Navbar></Navbar>
        <Header></Header>
      </Box>
      <Container>
        <Stack direction={{ xs: "column", sm: "row", lg: "row" }}
          spacing={{ xs: 1, sm: 2, m: 4 }}>
          <Box sx={{ flex: 2, p: 2 }}>
            <Card sx={{ minWidth: 150, mb: 3, mt: 3 }}>

              <Box sx={{ pb: 2 }}>
                <Typography component="h4" sx={{ color: "palette.secondary.main", fontWeight: 600 }}>filter by category</Typography>
                <SelectCategory types={jobTypes} cat={category} handleChangeCategory={handleCategory}></SelectCategory>
              </Box>
              <Box sx={{ pb: 2 }}>
                <Typography component="h4" sx={{ color: "palette.secondary.main", fontWeight: 600 }}>filter by location</Typography>

                <MenuList>
                  {
                    locations && locations.map((selectlocation, i) =>
                      <MenuItem key={i} onClick={() => handleLocationClick(selectlocation)}>
                        <ListItemIcon><LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 16 }}></LocationOnIcon></ListItemIcon>
                        {selectlocation}
                      </MenuItem>
                    )
                  }
                </MenuList>

              </Box>
            </Card>
          </Box>
          <Box sx={{ flex: 5, p: 2, border: "1px solid  #e0e0e0" }}>
            {linkedinjobs.map((job) => (
              <JobCard key={job._id} job={job}></JobCard>
            ))

            }
            <Stack spacing={2}>
              <Typography>Page: {page}</Typography>
              <Pagination count={totalPages} page={page} onChange={handlePage} />
            </Stack>
          </Box>

        </Stack>
      </Container>

    </>
  )
}

export default Home
