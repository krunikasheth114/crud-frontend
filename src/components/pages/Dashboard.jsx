import { AppBar, Box, Button, IconButton, Switch, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { axiosInstance } from '../../axios/axiosInstance';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const token = useSelector(state => state.accessToken);
    console.log(token,'token');


    const handleLogout = async ()=>{
        const response = await axiosInstance.post("http://127.0.0.1:8000/api/logout", {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });
        if (response) {
            console.log(response,'response');
            // dispatch(registerUser(response?.data));
            // resetForm()

            // navigate('/dashboard')
            // enqueueSnackbar(response?.data?.message, {
            //     variant: "success",
            //     anchorOrigin: { vertical: "top", horizontal: "right" },
            //     autoHideDuration: 1000,
            // });
        }

    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button variant='contained' color='success' onClick = {handleLogout}>Logout</Button>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Dashboard