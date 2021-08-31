import NavMenu from "./components/NavMenu";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home'
import RecipeFilterPage from "./components/RecipeSearch/RecipeFilterPage";
import SignIn from "./components/Auth/SignIn"
import SignUp from "./components/Auth/SignUp"
import {ThemeProvider} from "@material-ui/core"
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <header>
            <NavMenu/>
          </header>
          <main className='container'>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/filter/:page" component={RecipeFilterPage}/>
              <Route exact path="/sign-in" component={SignIn}/>
              <Route exact path="/sign-up" component={SignUp}/>
            </Switch>
          </main> 
        </div>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
