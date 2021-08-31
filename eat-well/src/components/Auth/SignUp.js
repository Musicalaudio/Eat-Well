import {InputLabel, TextField, Button} from '@material-ui/core'
import { useState } from 'react';
import axios from 'axios'

const SignUp = () => {
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/sign-up', {
            email: registerData.email,
            password: registerData.password
        })
        .then(function (response){
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
          });
    }

    const handleChange = (state, value) => {
        let newRegisterData = {...registerData}
        newRegisterData[state] = value;
        setRegisterData(newRegisterData)
    }

    return (
        <> 
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel>Email</InputLabel>
                <TextField value={registerData['email']} onChange={(e) => handleChange('email', e.target.value)}/>
                <InputLabel>Password</InputLabel>
                <TextField type='password' autoComplete="on" value={registerData['password']} onChange={(e) => handleChange('password', e.target.value)}/> 
                <Button color="primary" /*variant='contained'*/ type='submit'>Submit</Button>
            </form>
            <p>email: {registerData.email}</p>
            <p>password: {registerData.password}</p>
        </>
    );
}
 
export default SignUp;