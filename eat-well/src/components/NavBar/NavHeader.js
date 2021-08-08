import { Flex, Spacer} from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/layout";
import {Link} from '@chakra-ui/react'
import { Link as ReactLink} from "react-router-dom";

const NavHeader = () => {
  return (
    <Flex className='nav nav-header' justify='space-between'>   
       <img src='' alt="Eat-Well"/>
       <input className='recipe-search' placeholder="Search Recipe"/>
       <HStack className='admin-links'>
        <Link as={ReactLink}>Log In</Link>
        <Spacer/>
        <Link as={ReactLink}>Sign Up</Link>
       </HStack> 
    </Flex>
  );
}
 
export default NavHeader;