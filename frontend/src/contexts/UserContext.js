import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userState, setUserState] = useState({
        verifiedToken: false,
        user: null
    })
    
    return (
        <UserContext.Provider value={{userState, setUserState}}>
            {props.children}
        </UserContext.Provider>
    );
}
 

 
export default UserContextProvider;