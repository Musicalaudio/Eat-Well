import NavMenu from "./components/NavMenu";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home'
import RecipeFilterPage from "./components/RecipeSearch/RecipeFilterPage";
import SignIn from "./components/AccountComponents/SignIn"
import SignUp from "./components/AccountComponents/SignUp"
import AlreadyAuthorized from "./components/AuthComponents/AlreadyAuthorized"
import ProtectedRoute from "./components/AuthComponents/ProtectedRoute"
import Unauthorized from "./components/AuthComponents/Unauthorized";
import {ThemeProvider} from "@material-ui/core"
import theme from './theme'
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import {UserContext} from "./contexts/UserContext"
import RecipeInstructions from "./components/RecipeSearch/RecipeInstructions";
import SearchResults from "./components/RecipeSearch/SearchResults";
import SavedRecipes from "./components/HeaderComponents/SavedRecipes";
 


function App() {
  const {userState, setUserState} = useContext(UserContext);
  const [flag, setFlag] = useState(false);


  useEffect(() => {
      axios.all([
        axios.get('/verify/verifyAuth'),
        axios.get('/verify/checkUser')
      ])
      .then(function (response) {
        if(response[0].data.verifiedToken && userState.verifiedToken === false){
          setUserState({
            verifiedToken: (response[0].data)["verifiedToken"],
            user: (response[1].data),
          })
        }else if(!response[0].data.verifiedToken && userState.verifiedToken === true){
          setUserState({
            verifiedToken: false,
            user: null
          })
        }
      })
      .catch(function (error) {
        // handle error
        console.log("check login error:", error);
      })
    }, [setUserState, userState.verifiedToken, flag]
  )

  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <header>
              <NavMenu flag={flag} setFlag={setFlag}/>
            </header>
            <main className='container'>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/recipe-instructions/:title/:id" component={RecipeInstructions}/>
                <Route exact path="/filter/:page" component={RecipeFilterPage}/>
                <Route exact path="/search/:searchValue" component={SearchResults}/>
                <ProtectedRoute exact path="/saved-recipes" verifiedToken={userState.verifiedToken} component={SavedRecipes}/>
                <AlreadyAuthorized exact path="/sign-in" verifiedToken={userState.verifiedToken} flag={flag} setFlag={setFlag} component={SignIn}/>
                <AlreadyAuthorized exact path="/sign-up" verifiedToken={userState.verifiedToken} component={SignUp}/>
                <Route exact path="/unauthorized" component={Unauthorized}/>
              </Switch>
            </main> 
          </div>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
