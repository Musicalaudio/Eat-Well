import { useState } from "react";
import axios from 'axios'
import {InputLabel, TextField, Button} from '@material-ui/core'

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleForgotPassword = (e) => {
        e.preventDefault();
        const axiosConfig = {
            header: {
                "Content-Type": "application/json"
            }
        }

        axios.post("/newAuth/forgot-password", {email}, axiosConfig )
        .then(function(response){
            setSuccess(response.data.data);
        })
        .catch(function (err){
            setError(err.response.data.error)
            setEmail('');

        })
    }
    return ( 
        <div className="forgot-password">
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
                {error && <span>{error}</span>}
                {success && <span>{success}</span>}
                <div>
                    <p>Please enter the email of your account. We will send a reset password confirmation to that email.</p>
                    <InputLabel>Email</InputLabel>
                    <TextField value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Button color="primary" type="submit">Send Email</Button>
                </div>
            </form>
        </div>
    );
}
 
export default ForgotPasswordScreen;