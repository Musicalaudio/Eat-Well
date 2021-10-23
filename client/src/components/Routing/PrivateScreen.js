import {useEffect, useState} from 'react'
import axios from 'axios'

const PrivateScreen = ({history}) => {
    const [error, setError] = useState('');
    const [privateData, setPrivateData] = useState('');
    
    useEffect(() => {
        
        if(!localStorage.getItem("authToken")){
            history.push("/log-in")
        }

        let axiosConfig = { 
            headers: { 
                "Content-Type" : "application/json", 
                "Authorization": `Bearer ${localStorage.getItem('authToken')}`
            } 
        }

        axios.get("/private/private-screen", axiosConfig)
        .then(function(response){
            setPrivateData(response.data.data)
        })
        .catch(function(err){
            localStorage.removeItem("authToken");
            setError("You are not authorized. Please login.")
        })

    }, [history])

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        history.push("/log-in"); 
    }

    return (
        <div>
            {error? <span>{error}</span> : 
                    <>
                    <div>{privateData}</div>
                    <button onClick={() => handleLogout}>Logout</button>
                    </> 
            }
        </div>
    )
}

export default PrivateScreen;