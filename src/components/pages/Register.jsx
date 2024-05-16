import { Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { axiosInstance } from '../../axios/axiosInstance';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/loginAction';

const Register = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [language , setLanguage] = useState();
    const dispatch = useDispatch();

    const RegisterSchema = () => Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),

        mobile: Yup.string().required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        gender: Yup.string().required("select gender"),

        language: Yup.array().required("select atleast one language you know")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            gender: "",
            language: [],
            password: "",
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values, { setSubmitting }) => {


            console.log(values);

            const formData = new FormData();
            formData.append("firstname", values?.firstName);
            formData.append("lastname", values?.lastName);
            formData.append("email", values?.email);
            formData.append("mobile", values?.mobile);
            formData.append("gender", values?.gender);
            formData.append("lang_id", values?.language);
            formData.append("password", values?.password);



            await register(formData);
        }
    });

    const {
        handleSubmit,
        getFieldProps,
        touched,
        errors,
        setFieldValue,
        resetForm
    } = formik;



    const { mutateAsync: register } = useMutation(
        async (data) => {
            try {
                const response = await axiosInstance.post("http://127.0.0.1:8000/api/register", data);
                if (response) {
                    console.log(response,'response');
                    dispatch(registerUser(response?.data));
                    resetForm()

                    navigate('/dashboard')
                    enqueueSnackbar(response?.data?.message, {
                        variant: "success",
                        anchorOrigin: { vertical: "top", horizontal: "right" },
                        autoHideDuration: 1000,
                    });
                }

            } catch (error) {
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
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("http://127.0.0.1:8000/api/languages");
                setLanguage(response?.data?.languages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    


    return (
        <div>
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
                        {/* Add conditional rendering based on 'submitted' state */}
                        {/* {!submitted && ( */}
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        // required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        {...getFieldProps('firstName')}

                                    />
                                    {errors.firstName && touched.firstName && (
                                        <span className="text-red-500 text-xs" style={{ color: "red", fontSize: '10px' }}>{errors.firstName}</span>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        // required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        {...getFieldProps('lastName')}

                                    />
                                    {errors.lastName && touched.lastName && (
                                        <span className="text-red-500 text-xs" style={{ color: "red", fontSize: '10px' }}>{errors.lastName}</span>
                                    )}
                                </Grid>
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
                                        <span className="text-red-500 text-xs" style={{ color: "red", fontSize: '10px' }}>{errors.email}</span>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        // required
                                        fullWidth
                                        id="mobile"
                                        label="Mobile"
                                        name="mobile"
                                        autoComplete="mobile"
                                        {...getFieldProps('mobile')}

                                    />
                                    {errors.mobile && touched.mobile && (
                                        <span className="text-red-500 text-xs" style={{ color: "red", fontSize: '10px' }}>{errors.mobile}</span>
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
                                        <span className="text-red-500 text-xs" style={{ color: "red", fontSize: '10px' }}>{errors.password}</span>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"

                                            // value={age}
                                            label="Gender"
                                            // onChange={handleChange}
                                            {...getFieldProps('gender')}

                                        >
                                            <MenuItem value={'female'}>Female</MenuItem>
                                            <MenuItem value={'male'}>Male</MenuItem>
                                            <MenuItem value={'other'}>Other</MenuItem>

                                        </Select>
                                    </FormControl>
                                    {errors.gender && touched.gender && (
                                        <span className="text-red-500 text-xs" style={{ color: "red", fontSize: '10px' }}>{errors.gender}</span>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Language"
                                            multiple
                                            // value={values.languages} // Assuming 'values.languages' contains an array of selected language IDs

                                            // Add 'onChange' event handler to update selected values
                                            onChange={(event) => {
                                                const { options } = event.target;
                                                const selectedLanguages = [];
                                                for (let i = 0; i < options.length; i++) {
                                                    if (options[i].selected) {
                                                        selectedLanguages.push(options[i].value);
                                                    }
                                                }
                                                setFieldValue('languages', selectedLanguages); // Update form field value
                                            }}
                                            {...getFieldProps('language')}

                                        >
                                            {
                                                language?.map((lang)=>(
                                                    <MenuItem value={lang?.id}>{lang?.name}</MenuItem>           
                                                ))
                                            }
                                         
                                        </Select>
                                    </FormControl>
                                    {errors.language && touched.language && (
                                        <span className="text-red-500 text-xs" style={{ color: "red", fontSize: '10px' }}>{errors.language}</span>
                                    )}
                                </Grid>
                            </Grid>
                            <Button
                                name="submit"
                                type="submit"
                                // fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link
                                        href={"/login"}
                                        variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        {/* )} */}
                    </Form>
                </FormikProvider>
            </Box>
        </div>
    )
}

export default Register
