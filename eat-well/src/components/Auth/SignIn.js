import {InputLabel, TextField, Button} from '@material-ui/core'
import { useState } from 'react';
import axios from 'axios'

const SignIn = () => {
    const [accountData, setAccountData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        let axiosData = {email: accountData.email, password: accountData.password}
        let axiosConfig = { 
            credentials: 'include',
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type' : 'application/json'},
        }

       
    }


    const handleChange = (state, value) => {
        let newAccountData = {...accountData}
        newAccountData[state] = value;
        setAccountData(newAccountData)
    }

    return (
        <> 
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel>Email</InputLabel>
                <TextField  value={accountData['email']} onChange={(e) => handleChange('email', e.target.value)}/>
                <InputLabel>Password</InputLabel>
                <TextField type='password' autoComplete="on" value={accountData['password']} onChange={(e) => handleChange('password', e.target.value)}/> 
                <Button color="primary" /*variant='contained'*/ type='submit'>Submit</Button>
            </form>
            <p>email: {accountData.email}</p>
            <p>password: {accountData.password}</p>
        </>
    );
}
 
export default SignIn;