import { Route, Redirect } from 'react-router-dom';

const AlreadyAuthorized = ({ component: Component, verifiedToken, ...rest }) => {
    return (
      <Route {...rest} 
        render = {props => {
            if (verifiedToken) {
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

export default AlreadyAuthorized;