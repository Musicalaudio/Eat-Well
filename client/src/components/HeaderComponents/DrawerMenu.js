import {Tooltip} from "@mui/material"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from "react";
import {useHistory} from "react-router-dom"
import axios from 'axios';

const DrawerMenu = ({getRandomRecipe}) => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
        <Tooltip title="Navigation">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <MenuIcon />
            </IconButton>
        </Tooltip> 
        <Menu
        disableScrollLock={ true }
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={getRandomRecipe}>
          <ListItemIcon>
            <ShuffleIcon />
          </ListItemIcon>
          Random Recipe
        </MenuItem>
        <MenuItem onClick={() => history.push('/1/filter?')}>
          <ListItemIcon>
            <FilterListIcon />
          </ListItemIcon>
          Filter
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => history.push('/log-in')}>
          <ListItemIcon>
           <HowToRegIcon /> 
          </ListItemIcon>
          Log In
        </MenuItem>
        <MenuItem onClick={() => history.push('/register')}>
          <ListItemIcon>
            <PersonAddAltIcon /> 
          </ListItemIcon>
          Register
        </MenuItem>
      </Menu>

        </>
    )

}

export default DrawerMenu