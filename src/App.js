import React  from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Cocktails } from './pages/Cocktails';
import { Profile } from './pages/Profile';

function App() {
  return (
        <BrowserRouter>
          <Navbar />
            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>

              <Route path='/cocktails' component={Cocktails} />
              <Route path='/currency' component={Profile} />
            </Switch>

        </BrowserRouter>
  );
}

export default App;
