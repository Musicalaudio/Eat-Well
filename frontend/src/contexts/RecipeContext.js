import { createContext, useState } from "react";

export const RecipeContext = createContext();

const RecipeContextProvider = (props) => {
    const [userState, setUserState] = useState(undefined)
    
    return (
        <RecipeContext.Provider value={{userState, setUserState}}>
            {props.children}
        </RecipeContext.Provider>
    );
}
 

 
export default RecipeContextProvider;