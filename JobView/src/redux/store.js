// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
// import jobReducer from './slices/JobSlice'; // adjust path if needed
import jobTypeReducer from "./slices/JobTypeSlice"
import linkedinJobReducer from "./slices/LinkedinJObsSlice"
import authReducer from "./slices/Auth";
import userReducer from "./slices/UserSlice";
const store = configureStore({
    reducer: {
        jobs: linkedinJobReducer, // 'jobs' is the state key in your root reducer
        jobcategory: jobTypeReducer,
        authentication: authReducer,
        userInformation: userReducer
    },

});

export default store;
