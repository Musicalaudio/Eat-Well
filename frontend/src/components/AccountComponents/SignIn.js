import {InputLabel, TextField, Button} from '@material-ui/core'
import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios'
import {UserContext} from '../../contexts/UserContext'

const SignIn = ({flag, setFlag}) => {
    const {userState, setUserState} = useContext(UserContext);
    //const {verifiedToken, user} = userState;
    //console.log(userState.user)
    
    const [accountData, setAccountData] = useState({
        email: "",
        password: ""
    })

    const [ isError, setIsError ] = useState({ errors : {email: undefined, password: undefined}})

    const history = useHistory();

    const handleSignIn = async (event) => {
        event.preventDefault();
        let axiosData = {email: accountData.email, password: accountData.password}
        let axiosConfig = { 
            credentials: 'include',
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type' : 'application/json'},
        }
        axios.post('http://localhost:5000/auth/sign-in', axiosData, axiosConfig)
        .then(function (response){
            console.log(response);
            setFlag(!flag)
        })  
        .then(
            history.push('/')
        )
        .catch(function (err) {
            if(err.response){
                console.log(err.response.data)
                setIsError(err.response.data)
            }
        });
       
    }


    const handleChange = (state, value) => {
        let newAccountData = {...accountData}
        newAccountData[state] = value;
        setAccountData(newAccountData)
    }

    return (
        <> 
            {/* <h2>{JSON.stringify(isError)}</h2>  */}
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <InputLabel>Email</InputLabel>
                <TextField  value={accountData['email']} onChange={(e) => handleChange('email', e.target.value)}/>
                { isError.errors.email ? <p className='register-error'>{isError.errors.email}</p> : undefined}
                <InputLabel>Password</InputLabel>
                <TextField type='password' autoComplete="on" value={accountData['password']} onChange={(e) => handleChange('password', e.target.value)}/> 
                { isError.errors.password ? <p className='register-error'> {isError.errors.password} </p>  : undefined}
                <Button color="primary" /*variant='contained'*/ type='submit'>Submit</Button>
            </form>
            {/* <p>email: {accountData.email}</p> */}
            {/* <p>password: {accountData.password}</p> */}
        </>
    );
}
 
export default SignIn;