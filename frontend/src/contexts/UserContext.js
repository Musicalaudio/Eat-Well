import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userState, setUserState] = useState({})
    
    return (
        <UserContext.Provider value={{userState, setUserState}}>
            {props.children}
        </UserContext.Provider>
    );
}
 

 
export default UserContextProvider;