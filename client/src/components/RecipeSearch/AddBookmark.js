import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link  } from "@mui/material";
import LoginDialog from './LoginDialog';


const AddBookmark = ({id, title, image, imageType, bookmarked, setBookmarked, handleToggleSnackbar}) => {
    const {userState, setUserState} = useContext(UserContext)
    const userId = userState._id;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };    
    
    const addBookmark = () => {
        axios.post(`/recipes/save-recipe`, {userId, id, title, image, imageType})
        .then(function(response){
            localStorage.setItem('user', JSON.stringify(response.data))
            setUserState(response.data)
            setBookmarked(!bookmarked)
        }).then(
            handleToggleSnackbar(true)
        )
        .catch(function(err){
            console.log(err)
        })
    }
    
    return ( 
        <>
            {Object.keys(userState) !== 0 ?
                <>
                    <Tooltip title="Save Recipe">
                    <BookmarkAddIcon onClick={addBookmark} />  
                    </Tooltip>
                    <Link onClick={addBookmark}><u>Save Recipe</u></Link>
                </>
            :   <>                
                    <Tooltip title="Save Recipe">
                    <BookmarkAddIcon onClick={handleClickOpen} />  
                    </Tooltip>
                    <Link onClick={handleClickOpen}><u>Save Recipe</u></Link>
                    <LoginDialog
                        open={open}
                        onClose={handleClose}
                    />
                </>
            }
          
        </>
    );
}
 
export default AddBookmark;