import {AppBar, Toolbar, Typography, Tabs, Tab} from "@material-ui/core";
import { Link } from "react-router-dom"
import {useState, useRef, useEffect} from "react";


const NavMenu = () => {
  const [selectedTab, setselectedTab] = useState(0);

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
              <p> <Link to='/' className='ad-but'style={{ color: '#FFF' }}>Sign In</Link> | <Link to='/' className='ad-but' style={{ color: '#FFF' }}>Sign Up</Link> </p>
            </div>
          </Toolbar>
        </AppBar>
        

      </div>
    );
}
 
export default NavMenu;