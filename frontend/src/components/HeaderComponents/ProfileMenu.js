import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import BookmarksIcon from '@mui/icons-material/BookmarksOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useHistory} from "react-router-dom"
import { UserContext } from "../../contexts/UserContext";
import {useContext, useState} from 'react';


const ProfileMenu = () => {
    const {userState, setUserState} = useContext(UserContext)
    let history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
      setUserState({});
      localStorage.clear();
      history.push('/')
    }

    return ( 
        <div>
            <Box>
                <Tooltip title="Profile Options">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                {Object.keys(userState).length !== 0 ?
                  <Avatar sx={{ width: 36, height: 36 }}>{userState.username[0]}</Avatar>
                  :
                  <Avatar sx={{ width: 36, height: 36 }}/>
                }
                </IconButton>
                </Tooltip>
            </Box>
            <Menu
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
        <Link to="/saved-recipes" style={{ textDecoration: 'none', color: 'black' }}>
        <MenuItem>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon> 
          
            <Typography>Saved Recipes</Typography>
          
        </MenuItem>
        </Link>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <Typography> Logout </Typography>
          </MenuItem> 
      </Menu>
        </div>
    );
}
 
export default ProfileMenu;