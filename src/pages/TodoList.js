import React from 'react';
import {TodoItem} from './TodoItem'

export const TodoList = ({state}) => {
    return (
        <ul className='list-group'>
            {state.map(el => <TodoItem key={el.id} {...el} />)}
        </ul>
    )
}