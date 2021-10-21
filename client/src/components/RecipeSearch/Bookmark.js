import {useContext, useState, useEffect, forwardRef} from 'react';
import {UserContext} from '../../contexts/UserContext'
import AddBookmark from './AddBookmark';
import RemoveBookmark from './RemoveBookmark';
import { Snackbar  } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Bookmark = ({id, title, image, imageType, recipePage}) => {
    const [bookmarked, setBookmarked] = useState(false)
    const {userState} = useContext(UserContext)
    const savedRecipes = userState.savedRecipes;
    const [open, setOpen] = useState(false);

    const handleToggleSnackbar = (bool) => {
        setOpen(bool);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
    }

        setOpen(false);
    };
    
    useEffect(() => { 
        for(let i in savedRecipes){
            if(parseInt(savedRecipes[i].id) === parseInt(id)){
                setBookmarked(true)
            }
        }
    }, [id, savedRecipes])

    return(
        <>
            {bookmarked? <RemoveBookmark id={id}  handleClick={handleToggleSnackbar} bookmarked={bookmarked} setBookmarked={setBookmarked} recipePage={recipePage}/> : 
                         <AddBookmark id={id} handleClick={handleToggleSnackbar} title={title} image={image} imageType={imageType} bookmarked={bookmarked} setBookmarked={setBookmarked} recipePage={recipePage}/>   
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Recipe saved
                </Alert>
            </Snackbar>
        </>
    )
}


export default Bookmark;