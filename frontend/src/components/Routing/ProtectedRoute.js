import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, verifiedToken, ...rest }) => {
    return (
      <Route {...rest} 
        render = {props => {
            if (verifiedToken === false) {
                return <Redirect to={
                    {
                        pathname: '/Unauthorized',
                        state: {
                        from: props.location
                    }
                }
            } />
            } else {
                return <Component {...rest} {...props} />
        }
    }
} />
)
}

export default ProtectedRoute;