import {useContext, useState} from 'react';
import {UserContext} from '../../contexts/UserContext'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios'

const Bookmark = ({id, title, image, imageType}) => {
    const [bookmarked, setBookmarked] = useState(false)
    const {userState} = useContext(UserContext)
    const {verifiedToken, user} = userState;
    const userId = user.user._id;


    const addBookmark = () => {
        axios.post(`http://localhost:5000/recipes/save-recipe`, {userId, id, title, image, imageType})
        .then(
            alert('bookmark added'),
            setBookmarked(!bookmarked)
        )
        .catch(function(err){
            console.log(err)
        })
    }
    
    const removeBookmark = () => {
        axios.delete(`http://localhost:5000/recipes/unsave-recipe/${userId}/${id}`)
        .then(
            alert('bookmark removed'),
            setBookmarked(!bookmarked)
        )
        .catch(function(err){
            console.log(err)
        })
    }

    return(
        <>
        {verifiedToken ?
            <>
                {bookmarked? 
                    <Tooltip title="Recipe Saved">
                    <BookmarkAddedIcon onClick={removeBookmark} />     
                    </Tooltip>
                :   <Tooltip title="Save Recipe">
                    <BookmarkAddIcon  onClick={addBookmark} />     
                    </Tooltip>
                }
            </>
        :
            <> 
                <Tooltip title="Save Recipe">
                <BookmarkAddIcon  onClick={() => alert("You have to be signed in to bookmark a recipe to your account")} />     
                </Tooltip>
            </>
        }
        </>
    )
}


export default Bookmark;