import { Link } from "react-router-dom";

const Unauthorized = () => {
    return ( 
        <>  
            <h1>You don't have permissions to access this page</h1>
            <p><Link to="/">Go back home</Link></p>
        </>    
    );
}
 
export default Unauthorized;