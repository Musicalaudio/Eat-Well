import {ChakraProvider} from "@chakra-ui/react";
import NavMenu from "./components/NavBar/NavMenu";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavHeader from "./components/NavBar/NavHeader";
import Home from './pages/Home'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <div className='nav-wrapper'>
            <NavHeader/>
            <NavMenu/>
          </div>
          <section className='container'>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>

            </Switch>
          </section> 
          <Footer/>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
