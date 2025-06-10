import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk("user/login", async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:9000/auth/signin", credentials, {
            withCredentials: true,
        });
        console.log("logged user", response);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        return response.data;

    }
    catch (err) {
        // console.log(err);
        const message = err?.response?.data?.error || err.message;
        console.log(message, "message");
        return rejectWithValue(message);
    }
})
export const logout = createAsyncThunk("user/logout", async (__dirname, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:9000/auth/logout");
        return response.data
    }
    catch (err) {
        console.log("logout err", err);
        const message = err?.response?.data?.error || err.message;
        return rejectWithValue(message);
    }
});

const storedUser = localStorage.getItem("userInfo");
const initialState = {
    isLoggedIn: !!storedUser,
    userInfo: storedUser ? JSON.parse(storedUser) : null,
    error: null,

};
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers(builder) {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoggedIn = true;
            state.userInfo = action.payload;
            state.error = null;

        })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("in rejected case", action.payload);
                state.error = action.payload;
            })
            .addCase(logout.rejected, (state, action) => {
                toast.warning(action.payload);
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.userInfo = null;
                state.error = null;
                localStorage.removeItem("userInfo");

            }

            )
    }
}
);
export default authSlice.reducer;