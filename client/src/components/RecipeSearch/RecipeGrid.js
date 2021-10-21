import RecipeCard from './RecipeCard';
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from '@mui/material';

const useStyles = makeStyles(theme => ({
  gridText: {
    paddingLeft: theme.spacing(1)
  },
 
}))


const RecipeGrid = ({isPending, recipeData, displayQueryErrors, queryErrors}) => {
    const classes = useStyles()

    return(
        <div>
          <h2>Recipes</h2>
          <Grid className={classes.gridContainer} container spacing={2} >
                {isPending?   
                  <Typography className={classes.gridText}>Loading...</Typography> :
                  <>
                      {displayQueryErrors? 
                        <div  className={classes.gridText}>
                          <Alert variant="standard" severity="error" >
                          <AlertTitle>Attention:</AlertTitle>
                            {queryErrors.map(item => <Typography key={item}> {item} </Typography>)}
                          </Alert>
                        </div> 
                        :recipeData && recipeData.length > 0?
                          recipeData.map(recipe =>
                            <Grid className={classes.recipeGridItem} item lg={3} md={4} sm={6} xs={12} key={recipe.id}> 
                              <RecipeCard id={recipe.id} title={recipe.title} image={recipe.image} imageType={recipe.imageType}/> 
                            </Grid>
                          )
                          : <Typography className={classes.gridText}>We couldn't find any recipes with those filter requirements, sorry.</Typography>
                        }
                      
                  </> 
                }
          </Grid>
        </div>
    )
}

export default RecipeGrid;