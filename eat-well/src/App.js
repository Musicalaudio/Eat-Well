import NavMenu from "./components/NavMenu";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home'
import RecipeGridPage from "./components/RecipeSearch/RecipeGridPage";
import {ThemeProvider} from "@material-ui/core"
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <header>
            <NavMenu/>
          </header>
          <main className='container'>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/filter">
                <RecipeGridPage/>
              </Route>
            </Switch>
          </main> 
        </div>
      </Router>
    </ThemeProvider>

  );
}

export default App;
