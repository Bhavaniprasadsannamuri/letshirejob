import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const showJobs = createAsyncThunk("jobs/fetchAll", async (filters, { rejectWithValue }) => {
    try {
        const { page, keyword, location, category } = filters;
        const response = await axios.get(`http://localhost:9000/job/showJobs?pageNumber=${page}&location=${location}&category=${category}&keyword=${keyword}`);
        // console.log(response.data, "response");
        return response.data;
        // setJobs(response.data);
    }
    catch (err) {
        // console.log("error in showobs", err);
        const message = err.response?.data?.error || err.message
        // console.log("msg", message);
        return rejectWithValue(message);
    }
})
const initialState = {
    linkedinjobs: [],
    jobtypesids: [],
    count: 0,
    pageNumber: 1,
    locations: [],
    totalPages: 1,
    success: false,
    status: "idle",  // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    jobTypes: []

}
const JobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(showJobs.pending, (state, action) => {

            state.status = "loading"
        })
            .addCase(showJobs.fulfilled, (state, action) => {
                // console.log("fulfilled casse", action.payload);
                const { jobs, locations } = action.payload;
                console.log("locations", locations);
                state.status = "succeeded";
                // state.jobs = action.payload.jobs;
                state.linkedinjobs = action.payload.jobs;
                state.pageNumber = action.payload.pageNumber;
                state.count = action.payload.count;
                state.totalPages = action.payload.totalPages;
                state.jobTypes = action.payload.jobtypesids;
                state.locations = action.payload.locations;

            })
            .addCase(showJobs.rejected, (state, action) => {
                state.status = "failed";
                // console.log("rejected case", action.payload);
                state.error = action.payload;

            })
    }
})


export default JobSlice.reducer;

