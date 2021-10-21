import { useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router";
import {Grid, Typography} from "@material-ui/core"
import RecipeCard from "./RecipeCard";

const SearchResults = () => {
    const {searchValue} = useParams();
    const [searchData, setSearchData] = useState(undefined)
    
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
        <Grid>
            {searchData && searchData.length > 0 && <Typography variant="h5" component="h5"><strong>These are the top results based on your search:</strong></Typography>}
            <Grid container spacing={3} className="search-results"> 
                {/* <p>Testing {JSON.stringify(searchData)}</p> */}
                {searchData?
                    searchData.length > 0 && <Typography variant="h5" component="h5"><strong>These are the top results based on your search</strong></Typography>?
                        searchData.map(recipe =>
                            <Grid item lg={3} md={4} sm={6} xs={12} key={recipe.id}>
                              <RecipeCard id={recipe.id} title={recipe.title} imageType={recipe.imageType} image={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.${recipe.imageType}`}/> 
                            </Grid>
                            )
                    :
                        <Typography variant="h4" component="h4">We could not find any results based on your search</Typography>
  
                    : <Typography variant="h4" component="h4">Loading...</Typography>    
                }
            </Grid>
            
        </Grid>
     );
}
 
export default SearchResults;