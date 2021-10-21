import {InputLabel, TextField, Button, Typography, makeStyles} from '@material-ui/core'
import { useContext } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from "../../contexts/UserContext"
import { Link } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(12, "Please keep you username under 15 characters")
        .required("Please enter a username."),
    email: yup.string().email("Please enter a valid email").required("Please enter your email."),
    password: yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(15, "Please keep you password under 15 characters")
        .required("Please enter a password."),
    confirmPassword: yup.string().oneOf([yup.ref("password"), "Passwords do not match."]),
})


const Register = () => {
    const useStyles = makeStyles((theme) => ({
        register: {
            minHeight: "100vh",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
        },
        title: {
            paddingBottom: theme.spacing(4),
            textAlign: "center"
        },
        registerButton: {
            display: "flex",
            justifyContent: "center",
            paddingBottom: theme.spacing(2),
        },
        inputs: {
            paddingBottom: theme.spacing(1),
        },
        usernameError: {
            display: "block", 
            visibility: errors.username ? "visible" : "hidden"
        },
        emailError: {
            display: "block", 
            visibility: errors.email ? "visible" : "hidden"
        },
        passwordError: {
            display: "block", 
            visibility: errors.password ? "visible" : "hidden"
        },
        confirmPasswordError: {
            display: "block", 
            visibility: errors.confirmPassword ? "visible" : "hidden"
        },
    }))

    const history = useHistory();
    const {setUserState} = useContext(UserContext);
    const { register, handleSubmit, setError, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
      });

    const classes = useStyles();
    
    const handleRegister =  (data) => {
        let axiosData = { username: data.username, email: data.email, password: data.password}
        let axiosConfig = { 
            credentials: 'include',
            withCredentials: true,
            headers: {'Content-Type' : 'application/json'}
        }

        axios.post('/newAuth/register', axiosData, axiosConfig)
        .then(function (response){
            localStorage.setItem("authToken", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            setUserState(response.data.user)
            history.push('/')
        })
        .catch(function (err) {
            let errMessage = err.response.data.error
            if(errMessage.includes("Error, expected `username` to be unique.")){
                setError("username", {type: "manual", message:"Sorry, that username is already taken."})
            }
            if(errMessage.includes("Error, expected `email` to be unique.")){
                setError("email", {type: "manual", message:"An account with that email already exists."})
            }
        });
    }


    return (
            <div className={classes.register}>  
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className={classes.title}>
                    <Typography variant='h5'>Register</Typography>
                    </div>
                    <div className={classes.inputs}>
                        <InputLabel>Username</InputLabel>
                        <FormHelperText>(must be 3 to 12 character long)</FormHelperText>
                        <TextField color="secondary" error={ false || (errors.username && Object.keys(errors.username).length > 0)} fullWidth {...register('username')}  />
                        <FormHelperText className={classes.usernameError} error>{errors.username? errors.username.message: '_'}</FormHelperText>
                    </div>
                    <div className={classes.inputs}>
                        <InputLabel>Email</InputLabel>
                        <TextField color="secondary" error={false ||(errors.email && Object.keys(errors.email).length > 0)} fullWidth {...register('email')}  />
                        <FormHelperText className={classes.emailError} error>{errors.email? errors.email.message: '_'}</FormHelperText>
                    </div>
                    <div className={classes.inputs}>
                        <InputLabel>Password</InputLabel>
                        <FormHelperText>(must be 6 to 15 character long)</FormHelperText>
                        <TextField color="secondary" error={ false || (errors.password && Object.keys(errors.password).length > 0) } className={classes.inputs} fullWidth 
                              {...register('password')} type='password' autoComplete="on"  /> 
                        <FormHelperText className={classes.passwordError} error>{errors.password? errors.password.message: '_'}</FormHelperText>
                    </div>
                    <div className={classes.inputs}>
                        <InputLabel>Comfirm Password</InputLabel>
                        <FormHelperText>(enter your password again)</FormHelperText>
                        <TextField color="secondary" error={false || (errors.confirmPassword && Object.keys(errors.confirmPassword).length > 0)} className={classes.inputs} fullWidth 
                              {...register('confirmPassword')} type='password' autoComplete="on"  />
                        <FormHelperText className={classes.confirmPasswordError} error> {errors.confirmPassword ? "Passwords do not match!": "_"}</FormHelperText>
                    </div>
                    <div className={classes.registerButton}>
                        <Button color="secondary" variant='contained' type='submit' disableElevation>Submit</Button>
                    </div>
                    <Typography>Already have an account? <Link to="log-in">Login</Link> </Typography>
                </form>
            </div>
    );
}
 
export default Register;