import {useState} from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
import {InputLabel, TextField, Button} from '@material-ui/core'

const ResetPasswordScreen = ({match}) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setPassword('')
            setConfirmPassword('')
            return setError("Passwords don't match")
        }
        let axiosConfig = {
            header: {
                "Content-Type": "application/json"
            },
        }

        axios.put(`/newAuth/reset-password/${match.params.resetToken}`, {password}, axiosConfig)
        .then(function(response){
            setSuccess(response.data.data)
        })
        .catch(function(err){
            setError(err.response.data.error)
        })

    }
    return ( 
        <div>
            <h3>Forgot Password</h3>
            {error && <span> {error} </span>}
            {success && <span className="success-message"> {success} <Link to="/log-in">Login</Link> </span> }
            <form onSubmit={handleResetPassword}>
            <InputLabel>New Password</InputLabel>
            <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <InputLabel>Confirm New Password</InputLabel>
            <TextField type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <Button color="primary" type="submit">Reset Password</Button>
            </form>
        </div>
    );
}
 
export default ResetPasswordScreen;