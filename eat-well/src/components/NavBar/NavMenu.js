import { Link } from "react-router-dom"
import { Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/menu";
import { Flex } from "@chakra-ui/layout";

const NavMenu = () => {
    return (
      <Flex className="nav nav-menu" justify='space-evenly'>     
        <Menu>
            <MenuButton className="nav-link">Diets</MenuButton>
            <MenuList>
                <MenuItem> Gluten Free </MenuItem>
                <MenuItem> Ketogenic </MenuItem>
                <MenuItem> Vegetarian </MenuItem>
                <MenuItem> Lacto-Vegetarian </MenuItem>
                <MenuItem> Vegan </MenuItem>
                <MenuItem> Pescetarian </MenuItem>
                <MenuItem> Paleo </MenuItem>
                <MenuItem> Whole30 </MenuItem>
            </MenuList>
        </Menu>
        <Link className="nav-link"> Cuisine </Link>
        <Menu>
            <MenuButton className="nav-link"> Meal Plan </MenuButton>
            <MenuList>
                <MenuItem>Plan for a day</MenuItem>
                <MenuItem>Plan for a week</MenuItem>
            </MenuList>
        </Menu>
        <Link className="nav-link">Wines</Link>
        <Link className="nav-link">Random Recipe</Link>
        <Menu>
            <MenuButton className="nav-link"> Shopping List </MenuButton>
            <MenuList>
                <MenuItem>Create shopping list</MenuItem>
            </MenuList>
        </Menu>
          
      </Flex>
    );
}
 
export default NavMenu;