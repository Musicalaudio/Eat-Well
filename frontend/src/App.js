import NavMenu from "./components/HeaderComponents/NavMenu";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home'
import RecipeFilterPage from "./components/RecipeSearch/RecipeFilterPage";
import Login from "./components/AccountComponents/Login"
import Register from "./components/AccountComponents/Register"
import AlreadyAuthorized from "./components/Routing/AlreadyAuthorized"
import EmailConfirmed from "./components/Routing/EmailConfirmed"
import Unauthorized from "./components/Routing/Unauthorized";
import ForgotPasswordScreen from "./components/Routing/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/Routing/ResetPasswordScreen";
import PrivateRoute from "./components/Routing/PrivateRoute"
import PrivateScreen from "./components/Routing/PrivateScreen"
import {ThemeProvider} from "@material-ui/core"
import theme from './theme'
import { useEffect, useContext } from "react";
import {UserContext} from "./contexts/UserContext"
import RecipeInstructions from "./components/RecipeSearch/RecipeInstructions";
import SearchResults from "./components/RecipeSearch/SearchResults";
import SavedRecipes from "./components/HeaderComponents/SavedRecipes";
import { responsiveFontSizes } from "@material-ui/core";

function App() {
  const {setUserState} = useContext(UserContext);
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserState(foundUser);
    }
  }, [setUserState]);

  const responsiveTheme = responsiveFontSizes(theme)

  return (
      <ThemeProvider theme={responsiveTheme}>
        <BrowserRouter>
          <div className="App">
            <header>
              <NavMenu />
            </header>
            <main className='container'>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/recipe-instructions/:title/:id" component={RecipeInstructions}/>
                <Route exact path="/:page/filter" component={RecipeFilterPage}/>
                <Route exact path="/search/:searchValue" component={SearchResults}/>
                <Route exact path="/forgot-password" component={ForgotPasswordScreen}/>
                <Route exact path="/confirm-email/:confirmationToken" component={EmailConfirmed}/>
                <Route exact path="/reset-password/:resetToken" component={ResetPasswordScreen}/>
                {/* <ProtectedRoute exact path="/saved-recipes" verifiedToken={userState.verifiedToken} component={SavedRecipes}/> */}
                <PrivateRoute exact path="/saved-recipes" component={SavedRecipes}/>
                <PrivateRoute exact path="/private-screen" component={PrivateScreen}/>
                {/* <AlreadyAuthorized exact path="/sign-in" verifiedToken={userState.verifiedToken} flag={flag} setFlag={setFlag} component={SignIn}/> */}
                <Route exact path="/log-in" component={Login}/>
                {/* <AlreadyAuthorized exact path="/sign-up" verifiedToken={userState.verifiedToken} component={SignUp}/> */}
                <Route exact path="/register" component={Register}/>
                <Route exact path="/unauthorized" component={Unauthorized}/>
              </Switch>
            </main> 
          </div>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
