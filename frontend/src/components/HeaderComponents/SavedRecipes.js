import {UserContext} from '../../contexts/UserContext'
import { useContext } from 'react';
import RecipeCard from '../RecipeSearch/RecipeCard'
import { Grid } from "@material-ui/core";

const SavedRecipes = () => {
    const {userState} = useContext(UserContext)
    const {user, verifiedToken} = userState;
    //const savedRecipes = user.user.savedRecipes; 
    console.log(verifiedToken)
    console.log(user.user.savedRecipes)
    return ( 
        <div>   
            <h2>Saved Recipes:</h2>
            <Grid container spacing={3} className ="page-seperator">
            {
                user.user.savedRecipes.map(recipe =>
                    <Grid item xs ={3} key={recipe.id}>  
                        <RecipeCard id={recipe.id} title={recipe.title} image={recipe.image} imageType={recipe.imageType}/> 
                    </Grid>
                )
            }
            </Grid>
        </div>
     );
}
 
export default SavedRecipes;