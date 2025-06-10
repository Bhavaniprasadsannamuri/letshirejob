import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchJobTypes = createAsyncThunk("jobTypes/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:9000/job/showJobsTypes");
        // console.log("jobtyperes", response);
        return response.data;
    }
    catch (err) {
        // console.log("jobtyperes", err);
        const message = err.response?.data?.error || err.message;
        // console.log("jobtyperror", message);
        return thunkAPI.rejectWithValue(message);

    }
});
const initialState = {
    status: "idle",
    error: null,
    jobTypes: [],
    loading: false
}
const jobTypeSlice = createSlice({
    name: "jobType",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchJobTypes.fulfilled, (state, action) => {
                // console.log("fetchJobTypes.fulfilled", action.payload);
                state.jobTypes = action.payload.fetchJobTypes;
                ;
                state.status = "succeeded";
            })
            .addCase(fetchJobTypes.rejected, (state, action) => {

                state.error = action.payload; // from rejectWithValue
            });
    }

})
export default jobTypeSlice.reducer;

