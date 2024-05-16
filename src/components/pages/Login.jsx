import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { axiosInstance } from '../../axios/axiosInstance';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/loginAction';

const Login = () => {

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()

    const loginSchema = () => Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append("email", values?.email);
            formData.append("password", values?.password);
            await login(formData);
        }
    });

    const {
        handleSubmit,
        getFieldProps,
        touched,
        errors
    } = formik;



    const { mutateAsync: login } = useMutation(
        async (data) => {
            try {
                const response = await axiosInstance.post("http://127.0.0.1:8000/api/login", data);
                if (response) {
                    dispatch(loginUser(response?.data))
                    enqueueSnackbar(response?.data?.message, {
                        variant: "success",
                        anchorOrigin: { vertical: "top", horizontal: "right" },
                        autoHideDuration: 1000,
                    });
                }

            } catch (error) {
                
                if (error?.response?.data.error) {
                    enqueueSnackbar(error?.response?.data.error, {
                        variant: "error",
                        anchorOrigin: { vertical: "top", horizontal: "right" },
                        autoHideDuration: 1000,
                    });
                }else{
                    if (error?.response?.data.errors) {
                        Object.keys(error?.response?.data.errors).forEach((key) => {
                            enqueueSnackbar(error?.response?.data.errors[key]?.[0], {
                              variant: "error",
                              anchorOrigin: { vertical: "top", horizontal: "right" },
                              autoHideDuration: 2000,
                            });
                          });
                    }
                }
            }
        }
    );


    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    // required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    {...getFieldProps('email')}

                                />
                                {errors.email && touched.email && (
                                    <span className="text-red-500 text-xs mt-1 mb-2" style={{ color: "red", fontSize: '10px' }}>{errors.email}</span>
                                )}

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    // required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"

                                    {...getFieldProps('password')}

                                />
                                {errors.password && touched.password && (
                                    <span className="text-red-500 text-xs mt-1 mb-2" style={{ color: "red", fontSize: '10px' }}>{errors.password}</span>
                                )}

                            </Grid>

                        </Grid>
                        <Button
                            name="submit"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    href={"/"}
                                    variant="body2">
                                    haven't registerd yet? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            </FormikProvider>

        </Box>
    )
}

export default Login