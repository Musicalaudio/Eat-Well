import { Link } from "react-router-dom";

const NavHeader = () => {
  return (
    <nav className='nav nav-header' justify='space-between'>   
       <img src='' alt="Eat-Well"/>
       <input className='recipe-search' placeholder="Search Recipe"/>
       <div className='admin-links'>
        <Link>Log In</Link>
        <Link>Sign Up</Link>
       </div> 
    </nav>
  );
}
 
export default NavHeader;