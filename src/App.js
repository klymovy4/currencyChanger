import React  from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Cocktails } from './pages/Cocktails';
import { Currency } from './pages/Currency';
import { Registration } from './components/Registration'

function App() {
  return (
        <BrowserRouter>
          <Navbar />
            <Route path='/' exact>
              <Registration />
            </Route>
            <Switch>
              <Route path='/home'>
                <Home />
              </Route>

              <Route path='/cocktails'>
                <Cocktails />
              </Route>

              <Route path='/currency'>
                <Currency />
              </Route>
            </Switch>

        </BrowserRouter>
  );
}

export default App;
