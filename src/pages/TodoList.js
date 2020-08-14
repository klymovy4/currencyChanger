import React from 'react';
import {TodoItem} from './TodoItem'

export const TodoList = ({state}) => {
    return (
        <ul className='todo-ul'>
            {state.map(el => <TodoItem key={el.id} {...el} />)}
        </ul>
    )
}