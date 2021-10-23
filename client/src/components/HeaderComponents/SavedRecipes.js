import {UserContext} from '../../contexts/UserContext'
import { useContext, useState, useRef } from 'react';
import RecipeCard from '../RecipeSearch/RecipeCard'
import { Grid, Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    recipeContianer: {
        paddingLeft: theme.spacing(4)
        
    },

}))

const SavedRecipes = () => {
    const {userState} = useContext(UserContext)
    const classes = useStyles()
    return ( 
        <Box className={classes.recipeContianer}>   
            <h2>Saved Recipes:</h2>
            <Grid container spacing={2} >
            {userState.hasOwnProperty('savedRecipes') ?
                userState.savedRecipes.map(recipe =>
                    <Grid item lg={3} md={4} sm={6} xs={12} key={recipe.id} className={classes.recipeGridItem}>  
                        <RecipeCard id={recipe.id} title={recipe.title} image={recipe.image} imageType={recipe.imageType}/> 
                    </Grid>
                )
            :
                <p>Loading...</p>
            }
            
            </Grid>
        </Box>
     );
}
 
export default SavedRecipes;