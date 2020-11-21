import React from 'react'
import { Todo } from './TodoList'

// export interface Props extends Todo {}

export default function ListItem({
    id,
    description, 
    dueDate, 
    completed,
    handleUpdate,
    handleDelete
}: Todo) {
    return (
        <div>
            <li className={completed ? 'completedTodo' : ''}>
                <p>{description}</p> 
                {/* {dueDate && <p>Due: {dueDate}</p>} */}
                <p>Due: {dueDate}</p>
                <button onClick={() => handleUpdate(id)}>
                    {completed ? 'Mark Incompleted' : 'Mark Completed'}
                </button>
                <button onClick={() => handleDelete(id)}>Delete Todo</button>
            </li>
        </div>
    )
}
