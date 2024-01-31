import { useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router";
import {Grid, Typography, makeStyles} from "@material-ui/core"
import RecipeCard from "./RecipeCard";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: theme.spacing(2)
    },
    title: {
        paddingBottom: theme.spacing(1)
    },
    nothingFound: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(9)
    }
}))

const SearchResults = () => {
    const {searchValue} = useParams();
    const [searchData, setSearchData] = useState(undefined)
    const classes = useStyles();
    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/autocomplete?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}&number=24&query=${searchValue}`)
        .then(function(response){
            setSearchData(response.data)
        })
        .catch(function (error){
            //handle error
            console.log("search error:", error)
        })
    }, [searchValue])
    


    return (
        <Grid className={classes.container}>
            {searchData && searchData.length > 0 && <Typography variant="h5" component="h5" className={classes.title}>
                <strong>These are the top results based on your search:</strong>
            </Typography>}
            <Grid container spacing={3} className="search-results"> 
                {searchData?
                    searchData.length > 0 ?
                        searchData.map(recipe =>
                            <Grid item lg={3} md={3} sm={4} xs={6} key={recipe.id}>
                              <RecipeCard id={recipe.id} title={recipe.title} imageType={recipe.imageType} image={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.${recipe.imageType}`}/> 
                            </Grid>
                            )
                    :
                        <Typography variant="h5" component="h5" className={classes.nothingFound}>
                            We could not find any results based on your search
                        </Typography >
                    :   <Typography variant="h5" component="h5" className={classes.nothingFound}>
                            Loading...
                        </Typography>    
                }
            </Grid>
            
        </Grid>
     );
}
 
export default SearchResults;