import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from './RecipeCard';
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import FilterForm from "./FilterForm";
import { useHistory } from "react-router-dom";



const RecipeFilterPage = () => {
  const [page, setPage] = useState(1);
  const [number, setNumber] = useState(12); //number of results per page
  const [offset, setOffset] = useState((page - 1) * number);  
  var url = ***REMOVED***
  const [recipeData, setRecipeData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [totalItems, setTotalItems] = useState(null);
  const history = useHistory();
  //console.log(useParams())

  const [formState, setFormState] = useState({
    dietState: "",
    cuisineState: "",
    intoleranceState: "",
    typeState: "", 
    minVal: "",
    maxVal: "",
  })
 

  const handlePage = (event, value) => {
    setRecipeData(null)
    setIsPending(true);
    setPage(value);
    setOffset((value - 1) * number)
    history.push(`/filter/${value}`)
  };

  // console.log('log page:', page)
  // console.log('log offset:', offset)

  useEffect(() => {
    
    axios.get(url)
    .then(function (response) {
      return response.data;
    })
    .then(data=>{
      console.log(data)
      setRecipeData(data.results)
      setTotalItems(data.totalResults)
      setIsPending(false);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }, [url])

  //console.log(totalItems)

  return (
    <div className="outer-div">
      <div className="filter-page">
        <div className="form-page">
         <FilterForm data={recipeData} url={url} formState={formState} setFormState={setFormState}/>
        </div>
        <div className="grid-page">
          <h2>Recipes</h2>
            <Grid container spacing={3} className ="page-seperator">
              {isPending && <p>Loading...</p>}
              {recipeData 
              && 
              recipeData.map(recipe =>
                <Grid item xs ={3} key={recipe.id}> 
                  <RecipeCard id={recipe.id} title={recipe.title} image={recipe.image}/> 
                </Grid>
                )
              }
              </Grid>
        </div>
      </div>
      <div className="pagination-button">
      {/* <div>{page}</div> */}

      <Pagination defaultPage={1} page={page} count={Math.ceil(totalItems/number)} onChange={handlePage}
       color="primary" showFirstButton showLastButton />
       
    </div>
  </div>
  );
}
 
export default RecipeFilterPage;