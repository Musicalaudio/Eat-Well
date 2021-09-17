import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {Grid} from "@material-ui/core"
import RecipeCard from "./RecipeCard";

const SearchResults = () => {
    const {searchValue} = useParams();
    const [searchData, setSearchData] = useState(undefined)
    //console.log(searchValue)
    
    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/autocomplete?apiKey=***REMOVED***&number=25&query=${searchValue}`)
        .then(function(response){
            console.log(response.data)
            setSearchData(response.data)
            //console.log(searchValue)
            
        })
        .catch(function (error){
            //handle error
            console.log("search error:", error)
        })
    }, [searchValue])
    


    return (
        <div>
            {searchData && searchData.length > 0 ? <h2>These are the top results based on your search:</h2> : <></>}
            <Grid container spacing={3} className="search-results"> 
                {/* <p>Testing {JSON.stringify(searchData)}</p> */}
                {searchData?
                    searchData.length > 0 && <h2>These are the top results based on your search</h2>?
                        searchData.map(recipe =>
                            <Grid item xs ={3} key={recipe.id}> 
                              <RecipeCard id={recipe.id} title={recipe.title} image={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.${recipe.imageType}`}/> 
                            </Grid>
                            )
                    :
                        <h2>We could not find any results based on your search</h2>
                    
                    : <h2>Loading...</h2>    
                    
                }
            </Grid>
            
        </div>
     );
}
 
export default SearchResults;