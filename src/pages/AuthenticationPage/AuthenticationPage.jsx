import React from 'react';
import './AuthenticationPage.css'
import {Button, Divider, Paper, Stack, TextField} from "@mui/material";

function AuthenticationPage() {
    return (
        <div className='auth-page'>
            <Paper className='form-paper' elevation={4}>
                <div className='form-container'>
                    <Stack>
                        <TextField id='username' margin='dense' label='username'/>
                        <TextField id='password' margin='dense' label='password'/>
                        <Divider  variant='middle' />
                        <Button variant="contained">Contained</Button>
                    </Stack>
                </div>
            </Paper>
        </div>
    );
}

export default AuthenticationPage;