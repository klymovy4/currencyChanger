import React, {useEffect, useRef, useState, useReducer} from 'react';
import { NavLink} from 'react-router-dom'
import { Context } from '../context'
import {TodoList} from './TodoList'
import reducer from "../reducer";

export const Home = () => {
    const [updatedWidth, setUpdatedWidth] = useState(null)
    const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos')) || [])
    const [value, setValue] =useState('')
    const link = useRef()

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(state))
    },[state])
    const addList =event =>{
            if(event.key === 'Enter'){
               if(value){
                   dispatch({
                       type: 'ADD',
                       payload: value
                   })
                   setValue('')
               }
            }
    }

    useEffect(() => {

        const width = link.current.offsetWidth;

        if (width) {
            setUpdatedWidth(width + 15)
        }

    }, [])
    return (
        <Context.Provider value={{
           dispatch
        }}
        >
            <div className='container home-page  text-center '>
                <h1>Home Page</h1>
                <NavLink className='link' ref={link} style={{ width: updatedWidth }} to='/'>Link </NavLink><hr />
                <input type='text'
                    class="form-control"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={addList}
                />
                <TodoList state={state}/>
            </div>
         </Context.Provider>
    )
}