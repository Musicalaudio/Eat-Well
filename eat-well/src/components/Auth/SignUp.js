import {InputLabel, TextField, Button} from '@material-ui/core'
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'


const SignUp = () => {
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    
    const [ isError, setIsError ] = useState({ errors : {email: undefined, password: undefined}})

    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        let axiosData = { email: registerData.email, password: registerData.password}
        let axiosConfig = { 
            credentials: 'include',
            withCredentials: true,
            headers: {'Content-Type' : 'application/json'}
        }

        axios.post('http://localhost:5000/auth/sign-up', axiosData, axiosConfig)
        .then(function (response){
            console.log(response.data);
            history.push('/')
        })
        .catch(function (err) {
            if(err.response){
                
                console.log(err.response.data);
                setIsError(err.response.data)
            }
        });
    }

    const handleChange = (state, value) => {
        let newRegisterData = {...registerData}
        newRegisterData[state] = value;
        setRegisterData(newRegisterData)
    }

    return (
        <>  
            {/* <h2>{JSON.stringify(isError)}</h2>   */}
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel>Email</InputLabel>
                <TextField value={registerData['email']} onChange={(e) => handleChange('email', e.target.value)}/>
                { isError.errors.email ? <p className='register-error'>{isError.errors.email}</p> : undefined}
                <InputLabel>Password</InputLabel>
                <TextField type='password' autoComplete="on" value={registerData['password']} onChange={(e) => handleChange('password', e.target.value)}/> 
                { isError.errors.password ? <p className='register-error'> {isError.errors.password} </p>  : undefined}
                <Button color="primary" variant='contained' type='submit'>Submit</Button>
            </form>
            {/* <p>email: {registerData.email}</p> */}
            {/* <p>password: {registerData.password}</p> */}
        </>
    );
}
 
export default SignUp;