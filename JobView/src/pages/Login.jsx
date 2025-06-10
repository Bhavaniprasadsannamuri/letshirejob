import React, { useEffect } from 'react'
import axios from "axios"
import * as yup from "yup";
import { Box, Paper, TextField, Typography, Button, Alert } from '@mui/material';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const loginSchema = yup.object().shape({

    email: yup.string().email(`*invalid Email format`).required("email is required to login"),
    password: yup.string().min(6, `*mimimum should be 6 letters`).required("password is required to login")
})
const initialValues = {
    email: "",
    password: ""
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, error, } = useSelector((state) => state.authentication);
    const onSubmit = (values, action) => {
        // console.log(values, "form submitted");
        dispatch(loginUser(values));
        action.resetForm();

    }
    useEffect(() => {
        console.log("error", error, "isLoggedIn", isLoggedIn);
        if (isLoggedIn === true) {

            navigate("/user/dashboard");
            toast.success("logged in successfully");
        }
        if (error) {
            toast.warning("invalid login credentials");
        }


    }, [isLoggedIn])
    // const loginUser = async () => {
    //     try {
    //         const response = await axios.post("http://localhost:9000/user/showJobs", {
    //             "email": "seshu@gmail.com",
    //             "password": "alluri@123"
    //         });
    //         console.log(response);
    //         // setJobs(response.data);
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }
    // useEffect(() => {
    //     loginUser();
    // }, [])
    return (
        <>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh', alignContent: "center" }}>


                <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
                    <Paper sx={{ p: 3, pl: 6, pr: 6 }}>

                        <Form>
                            {/* <label htmlFor='email'>Email</label> */}
                            <Typography variant='h5' sx={{ mb: 3, textAlign: "center", color: "blue", fontWeight: 550 }}>Login</Typography>
                            {error && <Alert severity="warning">{error}</Alert>}

                            <Box sx={{ height: "40", borderRadius: "8px", mb: 2 }}>
                                <Field
                                    as={TextField}
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                                <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '0.875rem', mt: 3 }} /> <br />
                            </Box>

                            <Box sx={{ height: "40", borderRadius: "8px", mb: 1 }}>
                                <Field
                                    as={TextField}
                                    type="password"
                                    id="password"
                                    name="password"
                                    label="password"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                /><ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '0.875rem', mt: 1 }} /> <br />
                            </Box>

                            <Button variant="contained" fullWidth type="submit" sx={{ boxShadow: '0px 4px 8px rgba(128, 161, 194, 0.5)', mb: 2, mt: 2, textTransform: 'capitalize', }}>Submit</Button>
                        </Form>
                    </Paper>
                </Formik>

            </Box>
        </>
    )
}

export default Login
