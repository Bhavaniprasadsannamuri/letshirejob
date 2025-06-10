import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const showLinkedinJobs = createAsyncThunk("jobs/fetchAll", async (filters, { rejectWithValue }) => {
    try {
        const { page, keyword, location, category } = filters;
        const response = await axios.get(`http://localhost:9000/job/showJobs?pageNumber=${page}&location=${location}&category=${category}&keyword=${keyword}`);
        console.log(response.data, "response");
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
    totalPages: 1,
    success: false,
    status: "idle",  // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    jobTypes: []
}
const linkedinJobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(showLinkedinJobs.pending, (state, action) => {

            state.status = "loading"
        })
            .addCase(showLinkedinJobs.fulfilled, (state, action) => {
                console.log("fulfilled casse", action.payload);
                state.status = "succeeded";
                // state.jobs = action.payload.jobs;
                state.linkedinjobs = action.payload.jobs;
                state.pageNumber = action.payload.pageNumber;
                state.count = action.payload.count;
                state.totalPages = action.payload.totalPages;
                state.jobTypes = action.payload.jobtypesids
            })
            .addCase(showLinkedinJobs.rejected, (state, action) => {
                state.status = "failed";
                // console.log("rejected case", action.payload);
                state.error = action.payload;

            })
    }
})
export default linkedinJobSlice.reducer;