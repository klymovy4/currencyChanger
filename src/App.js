import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Cocktails } from './pages/Cocktails';
import { Profile } from './pages/Profile';
import {Context} from '../src/context'


function App() {

  const [data, setData] = useState([
    { id: Date.now(), name: 'John' },
    { id: Date.now() + 1, name: 'Paul' },
  ])
  const [value, setValue] = useState('')
  const changeValue = e => {
    setValue(e.target.value)
  }
  const addItem = (e) => {
    e.preventDefault()
     if(value){
       setData([
         ...data, { id: Date.now(), name: value }

       ])
       setValue('')
     }
  }
  return (
      <Context.Provider value={{
        changeValue,
        addItem,
        data,
        value
        }}
      >
        <BrowserRouter>

          <Navbar />
          {/*<div className='container pt-4'>*/}
            <Switch>
              <Route path='/' exact>
                <Home data={data}
                  value={value}
                  onClickHAndler={addItem}
                  changeHandlerValue={changeValue}
                />
              </Route>

              <Route path='/cocktails' component={Cocktails} />
              <Route path='/profile/:name' component={Profile} />
            </Switch>

        </BrowserRouter>
      </Context.Provider>
  );
}

export default App;
