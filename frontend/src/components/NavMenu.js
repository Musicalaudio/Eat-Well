import {AppBar, Toolbar, Typography, Tabs, Tab} from "@material-ui/core";
import { Link } from "react-router-dom"
import {useState, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import axios from 'axios';
import {useHistory} from 'react-router-dom' 
import ProfileMenu from "./HeaderComponents/ProfileMenu"

const NavMenu = ({flag, setFlag}) => {
  const {userState} = useContext(UserContext)
  const {verifiedToken, user} = userState;
  const [selectedTab, setselectedTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  let history = useHistory();


  const handleSearchSubmit = (event) => {
    event.preventDefault();
    history.push(`/search/${searchValue}`)
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
              <ProfileMenu flag={flag} setFlag={setFlag}/>
              :
              <p> <Link to='/sign-in' className='ad-but'style={{ color: '#FFF' }}>Sign In</Link> | <Link to='/sign-up' className='ad-but' style={{ color: '#FFF' }}>Sign Up</Link> </p>
              }
              </div>
          </Toolbar>
        </AppBar>
        

      </div>
    );
}
 
export default NavMenu;