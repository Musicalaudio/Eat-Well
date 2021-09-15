import {AppBar, Toolbar, Typography, Tabs, Tab} from "@material-ui/core";
import { Link } from "react-router-dom"
import {useState, useEffect, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import axios from 'axios';
import {useHistory} from 'react-router-dom' 

const NavMenu = ({flag, setFlag}) => {
  const {userState, setUserState} = useContext(UserContext)
  const {verifiedToken, user} = userState;
  const [selectedTab, setselectedTab] = useState(0);
  let history = useHistory();
  //console.log(userState)

  const logout = () => {
    //let newUserState = {...userState}
    
    axios.get('auth/log-out', {}, { credentials: 'include'})
      .then(function (response) {
        // handle success
        console.log("logged out")
        //console.log(response);
        userState.verifiedToken = false;
        userState.user = null;
        setFlag(!flag)
        // setUserState(newUserState);
        //history.push('/')
        // if (response.redirected) {
        //   return window.location.replace(response.url);
        // }
      })
      .then(history.push('/'))
      .catch(function (error) {
        // handle error
        console.log(error);
      })

      
      
  }

  return (
    <div className='toolbar'>  
        <AppBar position='static'>
          <Toolbar className='tabs'>
          <Typography className='logo' variant="h3" component="h2"><Link to='/'style={{color: '#FFF', textDecoration: 'none'}}>Eat-Well</Link></Typography>
            <Tabs value={selectedTab} centered> 
              <Tab disableRipple label='Filter'/>
              <Tab disableRipple label='Random'/>
            </Tabs>
            <div>
              <input type="text" placeholder="Search Recipe..."/>
            </div>
            <div className='admin-buttons'>
              {verifiedToken ?
              <Link to='/' className='ad-but'style={{ color: '#FFF' }} onClick={logout}>Logout</Link> :
              <p> <Link to='/sign-in' className='ad-but'style={{ color: '#FFF' }}>Sign In</Link> | <Link to='/sign-up' className='ad-but' style={{ color: '#FFF' }}>Sign Up</Link> </p>
              
              }
              </div>
          </Toolbar>
        </AppBar>
        

      </div>
    );
}
 
export default NavMenu;