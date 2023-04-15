import * as React from 'react';
import { Box } from '@mui/system';
import Layout from "../layout/Layout";
import { Container } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { userContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate()

    const {user, setUser} = useContext(userContext)
    const onChangeEmail = (e) => {
        console.log(e.target.value)
    }
    const onChangePassword = (e) => {
        console.log(e.target.value)
    }
    const onSubmitLogin = (e) => {

    }

    const onClickNavigateToSignUp=()=>{
        navigate('/signup')
    }

    return (
        <Layout>
            <form>
                <Container sx={{ display:'flex', flexDirection:'row'}}>
                    {/* <img src='../../data/gamesforfree-1.png' alt='gameimg'></img> */}
                    <img style={{ width: '100vw', maxWidth: '500px'}} src='data:image/jpeg;base64,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' alt='gameimg'></img>
                    <Box sx={{ display:'flex', flexDirection:'column', width: '100%', backgroundColor: 'primary.light', gap:2}}>
                        <Typography sx={{ textAlign:'center'}}>Log in to FreeToGame</Typography>
                        <TextField onChange={onChangeEmail} InputProps={{sx: {color: 'white'}}} InputLabelProps={{sx: {color: 'white' }}} label="Email Address" sx={{ color: 'white', backgroundColor: 'primary.dark'}}/>
                        <TextField onChange={onChangePassword} InputProps={{sx: {color: 'white'}}} InputLabelProps={{sx: {color: 'white' }}} label="Password" sx={{ color:'white', backgroundColor: 'primary.dark'}}/>
                        <Button sx={{backgroundColor:'primary', border:'solid'}}>Login</Button>
                        <Button sx={{backgroundColor:'primary'}}>Forgot Password?</Button>
                        <Button onClick={onClickNavigateToSignUp} sx={{backgroundColor:'primary'}}>Create Account</Button>
                    </Box>

                </Container>
            </form>
        </Layout>
    )
}