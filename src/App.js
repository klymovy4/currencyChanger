import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Cocktails } from './pages/Cocktails';
import { Profile } from './pages/Profile';


function App() {

  const [data, setData] = useState([
    { id: Date.now(), name: 'John' },
    { id: Date.now() + 1, name: 'Paul' },
  ])
  const [value, setValue] = useState('')
  const changeHandlerValue = e => {
    setValue(e.target.value)
  }
  const onClickHandler = (e) => {
    e.preventDefault()
    setData([
      ...data, { id: Date.now(), name: value }

    ])
    setValue('')
  }
  // console.log('1', data);
  return (
    <BrowserRouter>
      <Navbar />
      {/*<div className='container pt-4'>*/}
        <Switch>
          <Route path='/' exact>
            <Home data={data}
              value={value}
              onClickHAndler={onClickHandler}
              changeHandlerValue={changeHandlerValue}
            />
          </Route>

          <Route path='/cocktails' component={Cocktails} />
          <Route path='/profile/:name' component={Profile} />
        </Switch>



      {/*</div>*/}
    </BrowserRouter>
  );
}

export default App;
