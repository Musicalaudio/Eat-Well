import { useEffect, useState } from "react";
import axios from "axios"
import RecipeCard from './RecipeCard'
import { Grid } from "@material-ui/core";

var url = ***REMOVED***;

const RecipeSearchPage = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    
    axios.get(url)
    .then(function (response) {
      return response.data;
    })
    .then(data=>{
      setRecipeData(data.results)
      setIsPending(false);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }, [])


  console.log(recipeData)



  return (
    <div className="filter-page">
      <div className="form-page">
        <h2>Filter</h2>
        <form>

        </form>
      </div>
      <div className="grid-page">
        <h2>Recipes</h2>
          <Grid container spacing={3} className ="page-seperator">
            {isPending && <p>Loading...</p>}
            {recipeData 
            && 
            recipeData.map(recipe =>
              <Grid item xs ={3}> 
                <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image}/> 
              </Grid>
              )
            }
            </Grid>
      </div>
    </div>
    );
}
 
export default RecipeSearchPage;