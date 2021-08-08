import { Flex, Spacer} from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

const NavHeader = () => {
  return (
    <Flex className='nav nav-header' justify='space-between'>   
       <img src='' alt="Eat-Well"/>
       <input className='recipe-search' placeholder="Search Recipe"/>
       <HStack className='admin-links'>
        <Link>Log In</Link>
        <Spacer/>
        <Link>Sign Up</Link>
       </HStack> 
    </Flex>
  );
}
 
export default NavHeader;