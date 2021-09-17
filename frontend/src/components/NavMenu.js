import {AppBar, Toolbar, Typography, Tabs, Tab} from "@material-ui/core";
import { Link } from "react-router-dom"
import {useState, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import axios from 'axios';
import {useHistory} from 'react-router-dom' 

const NavMenu = ({flag, setFlag}) => {
  const {userState, setUserState} = useContext(UserContext)
  const {verifiedToken, user} = userState;
  const [selectedTab, setselectedTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  let history = useHistory();

  const logout = () => {    
    axios.get('auth/log-out', {}, { credentials: 'include'})
      .then(function (response) {
        // handle success
        console.log("logged out")
        userState.verifiedToken = false;
        userState.user = null;
        setFlag(!flag)
      })
      .then(history.push('/'))
      .catch(function (error) {
        // handle error
        console.log("logout error:", error);
      })  
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    history.push(`/search/${searchValue}`)
    console.log('hi')
    // axios.get(`https://api.spoonacular.com/recipes/autocomplete?apiKey=***REMOVED***&number=10&query=${searchValue}`)
    // .then(function(response){
    //   console.log(response.data)
    //   console.log(searchValue)
    //   history.push(`/search/${searchValue}`)
    // })
    // .catch(function (error){
    //   //handle error
    //   console.log("search error:", error)
    // })

  }

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value)
    
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
              <form onSubmit={(event) => handleSearchSubmit(event)}>
                <input type="text" placeholder="Search Recipe..." value={searchValue} onChange={event => handleSearchChange(event)}/>
              </form>
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