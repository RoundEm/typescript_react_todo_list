import React from 'react'
import { TodoProps } from './Types'

// export interface Props extends Todo {}

export default function ListItem({
    id,
    description, 
    dueDate, 
    completed,
    handleToggleCompleted,
    handleDelete
}: TodoProps) {
    return (
        <div>
            <li className={completed ? 'completedTodo' : ''}>
                <p>{description}</p> 
                {/* {dueDate && <p>Due: {dueDate}</p>} */}
                <p>Due: {dueDate}</p>
                <button onClick={() => handleToggleCompleted(id)}>
                    {completed ? 'Mark Incompleted' : 'Mark Completed'}
                </button>
                <button onClick={() => handleDelete(id)}>Delete Todo</button>
            </li>
        </div>
    )
}
