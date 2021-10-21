import { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import FilterForm from "./FilterForm";
import { useHistory, useParams, useLocation } from "react-router-dom";
import RecipeGrid from "./RecipeGrid";
import { Grid } from "@material-ui/core";

const RecipeFilterPage = () => {
  const {page} = useParams()
  const [pageNumber, setPageNumber] = useState(parseInt(page))
  const [number, setNumber] = useState(12); //number of results per page
  const [offset, setOffset] = useState((page - 1) * number);  
  const [recipeData, setRecipeData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [totalResults, setTotalResults] = useState(null);
  const history = useHistory();
  const [fetchedUrl, setFetchedUrl] = useState(`https://api.spoonacular.com/recipes/complexSearch?`)
  const { search } = useLocation();
  const [queryParams, setQueryParams] = useState(search)
  const [displayQueryErrors, setDisplayQueryErrors] = useState(false)
  const [queryErrors, setQueryErrors] = useState([])

  const handlePage = (event, value) => {
    setRecipeData(null)
    setIsPending(true);
    setPageNumber(value);
    setOffset((value - 1) * number)
    history.push(`/${value}/filter?${queryParams}`)
  };
  
  return (
    <>
    <Grid container className="page-seperator" >
        <Grid item lg={3} md={3} sm={12} xs={12}>
         <FilterForm page={page} setQueryParams={setQueryParams} queryErrors={queryErrors} setQueryErrors={setQueryErrors}
         fetchVariables={{fetchedUrl, offset, number, queryParams}}
         fetchHooks={{setRecipeData, setTotalResults, setIsPending, setDisplayQueryErrors}}/>
        </Grid>
        <Grid item lg={9} md={9} sm={12}xs={12} >
            <RecipeGrid queryErrors={queryErrors} displayQueryErrors={displayQueryErrors} isPending={isPending} recipeData={recipeData} displa/>
        </Grid>
    </Grid>
    <div className="pagination-button">
      <Pagination defaultPage={1} page={pageNumber} count={Math.ceil(totalResults/number)} onChange={handlePage}
      color="primary" showFirstButton showLastButton />     
    </div>
    </>
  );
}
 
export default RecipeFilterPage;