import {useState, useEffect, useContext} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Button, TextField, InputLabel} from "@material-ui/core";
import {UserContext} from "../../contexts/UserContext"

const EmailConfirmed = ({match}) => {
    const [success, setSuccess] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [email, setEmail] = useState('')
    const [resendEmailResponse, setResendEmailResponse] = useState('')
    const {setUserState} = useContext(UserContext);
    console.log(match.params.confirmationToken)
    
    useEffect(() => {
        let axiosConfig = {
            header: {
                "Content-Type": "application/json"
            },
        }
        axios.put(`/newAuth/confirm-user/${match.params.confirmationToken}`, {},axiosConfig)
        .then(function(response){
            setSuccess(true)
            localStorage.setItem("authToken", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            setUserState(response.data.user)
        })
        .catch(function(err){
            setError(err.response.data.error)
        })
    }, [])

    const resendEmail = (e) => {
        e.preventDefault()
        let axiosConfig = {
            header: {
                "Content-Type": "application/json"
            },
        }
        axios.put(`/newAuth/resend-email`, {email} ,axiosConfig)
        .then(function(response){
            setResendEmailResponse(response.data)
        })
        .catch(function(err){
            setResendEmailResponse(err.response.data)
        })
    }

    return(
        <>
            {success ? <h3>Thank you for confirming your email.</h3> :
                       <div>
                        <h3>{error}</h3>
                        <p>To get a new confirmation link sent to you, enter your email and click on the Resend Email button: </p>
                        <form onSubmit={(e) => resendEmail(e)}>
                            <InputLabel>Enter Email</InputLabel>
                            <TextField value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Button variant="contained" color='primary' type='submit'>Resend Email</Button>
                        </form>
                        {resendEmailResponse && resendEmailResponse === "This account has been already verified" ?
                        <p>{resendEmailResponse}, click here to <Link to="log-in">log in.</Link></p>
                        :<p>{resendEmailResponse}</p>
                        }
                       </div>
            }
        </>
    )
}

export default EmailConfirmed;