import React from 'react'
import { Box, Button, Paper, Alert, Typography, TextField } from '@mui/material';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
const AddJob = ({ close }) => {
    const initialvalues = {};
    const handleSubmit = (e) => {
        // jobTitle: req.body.jobTitle,
        //       salary: req.body.salary,
        //       description: req.body.description,
        //       location: req.body.location,
        //       available: req.body.available,
        //       user: req.user.id,
        //       jobType: req.body.jobType
    }
    return (
        <>
            <Box sx={{
                flex: 1, display: "flex", justifyContent: "center", alignItems: "center",
                zIndex: 100, top: 0, left: 0, bottom: 0, right: 0, height: "100vh", position: "fixed", backgroundColor: "rgba(0, 0, 0,0.7)"
            }}>
                <Formik initialValues={initialvalues} onSubmit={handleSubmit}>
                    <Paper sx={{
                        p: 3, pl: 6, pr: 6, width: "50vw", display: "flex", flexDirection: "column", position: "relative"

                    }}>
                        <Box onClick={close} sx={{

                            cursor: 'pointer',

                            boxSizing: "content-box",
                            color: "blue",
                            position: "absolute",
                            top: 26, right: 48




                        }}>
                            <CloseIcon></CloseIcon></Box>


                        <Typography variant='h5' sx={{ mb: 3, textAlign: "center", color: "blue", fontWeight: 550 }}>Create a Job</Typography>

                        <Form>
                            {/* <label htmlFor='email'>Email</label> */}
                            {/* {error && <Alert severity="warning">{error}</Alert>} */}
                            <Box sx={{ height: "40", borderRadius: "8px", mb: 2 }}>
                                <Field
                                    as={TextField}
                                    id="jobTitle"
                                    name="jobTitle"
                                    label="jobTitle"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                                <ErrorMessage name="jobTitle" component="div" style={{ color: 'red', fontSize: '0.875rem', mt: 3 }} /> <br />
                            </Box>
                            <Box sx={{ height: "40", borderRadius: "8px", mb: 2 }}>
                                <Field
                                    as={TextField}
                                    id="salary"
                                    name="salary"
                                    label="salary"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                                <ErrorMessage name="salary" component="div" style={{ color: 'red', fontSize: '0.875rem', mt: 3 }} /> <br />
                            </Box>

                            <Box sx={{ height: "40", borderRadius: "8px", mb: 1 }}>
                                <Field
                                    as={TextField}

                                    id="description"
                                    name="description"
                                    label="job description"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                /><ErrorMessage name="description" component="div" style={{ color: 'red', fontSize: '0.875rem', mt: 1 }} /> <br />
                            </Box>
                            <Box sx={{ height: "40", borderRadius: "8px", mb: 1 }}>
                                <Field
                                    as={TextField}

                                    id="location"
                                    name="location"
                                    label="location"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                /><ErrorMessage name="description" component="div" style={{ color: 'red', fontSize: '0.875rem', mt: 1 }} /> <br />
                            </Box>

                            <Button variant="contained" fullWidth type="submit" sx={{ boxShadow: '0px 4px 8px rgba(128, 161, 194, 0.5)', mb: 3, mt: 2, textTransform: 'capitalize', }}>Submit</Button>
                        </Form>
                    </Paper>
                </Formik>

            </Box>

        </>
    )
}

export default AddJob
