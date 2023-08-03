import React from 'react';
import './AuthenticationPage.css'
import {Button, Paper, Stack, TextField} from "@mui/material";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

function AuthenticationPage() {
    return (
        <div className='full-bg auth-page'>
            <Paper className='form-paper'>
                <div className='form-container'>
                    <Stack>
                        <TextField id='username' margin='dense' label='username'/>
                        <TextField id='password' margin='dense' label='password'/>
                        <Button
                            size='large'
                            sx={{marginTop: '10px'}}
                            onClick={(e) => e.preventDefault()}
                            variant="contained"
                            endIcon={<LoginOutlinedIcon />}>Login</Button>
                    </Stack>
                </div>
            </Paper>
        </div>
    );
}

export default AuthenticationPage;