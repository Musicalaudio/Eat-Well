import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link } from 'react-router-dom'

const LoginDialog = (props) => {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Log in to save recipe</DialogTitle>
          <List sx={{ pt: 0 }}>    
          <Link to="/log-in" style={{textDecoration: 'none'}}>
            <ListItem autoFocus button >
              <ListItemAvatar>
                <Avatar>
                  <HowToRegIcon/> 
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Click here to log in" style={{textAlign: 'center', color: 'black', textDecoration: 'underline'}} />
            </ListItem>
            </Link>
          </List>
        </Dialog>
      );
}

LoginDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default LoginDialog;