import {InputLabel, TextField, Button, Typography, makeStyles} from '@material-ui/core'
import { useContext } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from "../../contexts/UserContext"
import { Link } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
 
const schema = yup.object().shape({
    usernameOrEmail: yup.string().required("Please enter your username/email"),
    password: yup.string().required("Please enter your password")
})

const Login = () => {
    const useStyles = makeStyles((theme) => ({
        logIn: {
            display: "flex",
            minHeight: "80vh",
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            paddingBottom: theme.spacing(4),
            textAlign: "center"
        },
        loginButton: {
            display: "flex",
            justifyContent: "center",
            paddingBottom: theme.spacing(2),
        },
        inputs: {
            paddingBottom: theme.spacing(1),
        },
        forgotPassword: {
            textAlign: "center",
            paddingBottom: theme.spacing(1),
        },
        register: {
            textAlign: "center"
        },
        userError: {
            display: "block", 
            visibility: errors.usernameOrEmail ? "visible" : "hidden"
        },
        passwordError: {
            display: "block", 
            visibility: errors.password ? "visible" : "hidden"
        },

    }))

    const {register, handleSubmit, setError, formState: {errors}} = useForm({resolver: yupResolver(schema)})
    
    const classes = useStyles();
    const history = useHistory();
    const {setUserState} = useContext(UserContext);

    const handleLogin = (data) => {
        let axiosData = { usernameOrEmail: data.usernameOrEmail, password: data.password}
        let axiosConfig = { 
            credentials: 'include',
            withCredentials: true,
            headers: {'Content-Type' : 'application/json'}
        }
        axios.post('/newAuth/login', axiosData, axiosConfig)
        .then(function (response){
            localStorage.setItem("authToken", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            setUserState(response.data.user)
             
            history.push('/')
        })
        .catch(function (err) { 
            //if the username or password is false
            if(err.response.data.error === "The username or email you've entered doesn't belong to an account"
            || err.response.data.error === "The password you've entered is incorrect"){   
                if(err.response.data.error === "The username or email you've entered doesn't belong to an account"){
                    setError("usernameOrEmail", {type: "manual", message: "Username or Email doesn't exist",})
                }else{
                    setError("password", {type: "manual", message: "The password you've entered is incorrect",})
                }
            }
        });
    }

    return (
        <div className={classes.container}>
        
            <div className={classes.logIn}>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className={classes.title} >
                        <Typography variant="h5">Log In</Typography>
                    </div>
                    <div className={classes.inputs}>
                        <InputLabel>Username or Email</InputLabel>
                        <TextField color="secondary" error={false||(errors.usernameOrEmail && Object.keys(errors.usernameOrEmail).length > 0)} {...register('usernameOrEmail')}
                        fullWidth />   
                        <FormHelperText className={classes.userError} error>{errors.usernameOrEmail? errors.usernameOrEmail.message: "_"}</FormHelperText>
                        
                    </div>
                    <div className={classes.inputs}>
                        <InputLabel>Password</InputLabel>
                        <TextField color="secondary" error={false|| (errors.password && Object.keys(errors.password).length > 0)} {...register('password')}
                        fullWidth type='password' autoComplete="on" />
                        <FormHelperText className={classes.passwordError} error>{errors.password? errors.password.message: "_"}</FormHelperText>
                    </div>
                    <div className={classes.loginButton}>
                        <Button color="secondary" variant='contained' type='submit' disableElevation>Login</Button>
                    </div>
                    <Typography className={classes.forgotPassword}>Forgot Password? <Link to="/forgot-password"> Click Here </Link> </Typography>
                    <Typography className={classes.register}>Don't have an account? <Link to="/register">Register</Link> </Typography>
                </form>
                
            </div>
        </div>
    );
}
 
export default Login;