import { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import FilterForm from "./FilterForm";
import { useHistory, useParams, useLocation } from "react-router-dom";
import RecipeGrid from "./RecipeGrid";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'center'
  },
  paginationButton: {
    padding: "30px 0",
    display: "flex",
    justifyContent: "center"
  }
}))

const RecipeFilterPage = () => {
  const classes = useStyles()
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
    <div>
    <Grid container className={classes.container} >
        <Grid item lg={2} md={3} sm={12} xs={12} className={classes.filterForm}>
         <FilterForm page={page} setQueryParams={setQueryParams} queryErrors={queryErrors} setQueryErrors={setQueryErrors}
         fetchVariables={{fetchedUrl, offset, number, queryParams}}
         fetchHooks={{setRecipeData, setTotalResults, setIsPending, setDisplayQueryErrors}}/>
        </Grid>
        <Grid item lg={8} md={9} sm={12}xs={12} className={classes.recipeGrid}>
            <RecipeGrid queryErrors={queryErrors} displayQueryErrors={displayQueryErrors} isPending={isPending} recipeData={recipeData} displa/>
        </Grid>
    </Grid>
    <div className={classes.paginationButton}>
      <Pagination defaultPage={1} page={pageNumber} count={Math.ceil(totalResults/number)} onChange={handlePage}
      color="primary" showFirstButton showLastButton />     
    </div>
    </div>
  );
}
 
export default RecipeFilterPage;