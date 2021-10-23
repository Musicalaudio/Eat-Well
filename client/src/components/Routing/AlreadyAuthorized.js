import {Redirect, Route} from "react-router-dom"


const AlreadyAuthorized = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {(props) => 
                localStorage.getItem("authToken") ? (
                    <Redirect to="/"/>
                ) : (
                    <Component {...props}/>
                )
            }
        />
    )
}

export default AlreadyAuthorized;