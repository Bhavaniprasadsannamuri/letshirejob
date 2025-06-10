import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const userDetails = createAsyncThunk("userdetails/fetch", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:9000/auth/me", {
            withCredentials: true
        });
        return response.data;

    } catch (err) {
        console.log(err, "error in thunk function user details");
        const message = err.response?.data?.error || err.message;
        return rejectWithValue(message);
    }
})
const initialState = {
    user: null,
    error: null,
    isLoading: false
}
const userSlice = createSlice({
    name: "userDetails",
    initialState,
    extraReducers(builder) {
        builder.addCase(userDetails.pending, (state, action) => {
            // state.userDetails = action.payload.user;
            state.isLoading = true;
        }).addCase(userDetails.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
        }).addCase(userDetails.rejected, (state, action) => {
            // state.userDetails = action.payload.user;
            state.isLoading = false;
            // console.log(action.payload, "userdetails rejected")
            state.error = action.payload;
        })
    }



})
export default userSlice.reducer;