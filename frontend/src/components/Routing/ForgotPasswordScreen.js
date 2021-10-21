import axios from 'axios'
import {InputLabel, TextField, Button, makeStyles, Typography} from '@material-ui/core'
import { FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import {useState} from "react"
import Alert from '@mui/material/Alert';

const schema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Please enter your email."),
})

const ForgotPasswordScreen = () => {
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });
    const [toggleResponse, setToggleResponse] = useState(undefined)
    const [severity, setSeverity] = useState("success")

    const useStyles = makeStyles((theme) => ({
        forgotPassword: {
            minHeight: '80vh',
            textAlign: 'center',
            alignItems: 'center',
            display: 'flex',
            justifyContent: "center",
        },
        title: {
            paddingBottom: theme.spacing(1),
        },
        label: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(1),
        },
        success: {
            minWidth: "489.16", 
            display: "flex", 
            justifyContent: "center",
            paddingBottom: theme.spacing(0),
            visibility: toggleResponse ? "visible" : "hidden"
        },
        emailError: {
            display: "flex",
            justifyContent: 'center',    
            visibility: errors.email ? "visible" : "hidden",
            paddingBottom: theme.spacing(1)
        },
        button: {
            display: "flex",
            justifyContent: "center",
            paddingBottom: theme.spacing(2),
        },
    }))
    const classes = useStyles()    
    
    const handleForgotPassword = (data) => {
        const axiosConfig = {
            header: {
                "Content-Type": "application/json"
            }
        }

        axios.post("/newAuth/forgot-password", {email: data.email}, axiosConfig )
        .then(function(response){
            console.log(response)
            setToggleResponse(true)
            setSeverity("success")
        })
        .catch(function (err){
            if(err.response.data.error === 'Email could not be sent'){
                //this probably means that an account with that email doesn't exist, 
                //but we don't want to reveal that information.
                setToggleResponse(true)
                setSeverity("success")
            }else{
                //this statement won't be reached because if the input isn't a valid email 
                //react-hook-form won't let it get to the axios request
                setToggleResponse(false)
                setSeverity("error")
            }
        })
    }

    return (  
        <div className={classes.forgotPassword}>
            <form onSubmit={handleSubmit(handleForgotPassword)} className={classes.form}>
                <Typography variant='h5' className={classes.title}>Forgot Password</Typography>
                <div className={classes.success} >
                    <Alert severity={severity} style={{padding: '0'}}>
                            {toggleResponse? 'If an account with that email exists, an email has been sent (might be in your spam folder).' : ''}
                    </Alert>
                </div>
                <Typography>Please enter the email of your account. We will send a reset password confirmation to that email.</Typography>
                <InputLabel className={classes.label}>Email:</InputLabel>
                <TextField error={false ||(errors.email && Object.keys(errors.email).length > 0)} color="secondary" {...register('email')} placeholder='Enter email' />
                <FormHelperText className={classes.emailError} error>{errors.email? errors.email.message: '_'}</FormHelperText>
                <div classes={classes.button}>
                    <Button variant='contained' color="secondary" type="submit" disableElevation>Send Email</Button>
                </div>
            </form>
        </div>
    );
}
 
export default ForgotPasswordScreen;