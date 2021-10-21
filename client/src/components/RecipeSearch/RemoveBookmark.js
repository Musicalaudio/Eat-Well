import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { useContext } from 'react';
import {UserContext} from '../../contexts/UserContext'
import { Link } from "@mui/material";

const RemoveBookmark = ({id, bookmarked, setBookmarked, handleToggleSnackbar}) => {
    const {userState, setUserState} = useContext(UserContext)
    const userId = userState._id;

    const removeBookmark = () => {
        axios.delete(`/recipes/unsave-recipe/${userId}/${id}`)
        .then(function(response){
            localStorage.setItem('user', JSON.stringify(response.data))
            setUserState(response.data)
            setBookmarked(!bookmarked)
        }).then(
            handleToggleSnackbar(false)
        )
        .catch(function(err){
            console.log(err)
        })
    }

    return ( 
        <>
            <Tooltip title="Recipe Saved">
                <BookmarkAddedIcon style={{color:"#00C853"}} onClick={removeBookmark} />    
            </Tooltip>
            <Link onClick={removeBookmark}><u>Unsave Recipe</u></Link> 
        </>
    );
}
 
export default RemoveBookmark;