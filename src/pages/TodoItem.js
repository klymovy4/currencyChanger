import React, { useContext } from 'react';
import { Context } from '../context'

export const  TodoItem = ({name, id, completed}) => {
    const {dispatch} = useContext(Context)
    const style =['list-group-item list-group-item-action']
    if(completed){
        style.push('completed')
    }
    return (
        <li key={id} className={style.join(' ')}>
            <label>
                <input type='checkbox'
                       checked={completed}
                       onChange={() => dispatch({
                           type: 'TOGGLE',
                           payload: id
                       })}
                />

                <span>{name}</span>
            </label>
                <button
                    className="btn btn-outline-dark"
                    onClick={() => dispatch({
                    type: 'REMOVE',
                    payload: id
                })}>&times;</button>

        </li>
    )

}