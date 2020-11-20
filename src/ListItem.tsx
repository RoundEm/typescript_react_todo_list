import React from 'react'
import { Todo } from './TodoList'

// export interface Props extends Todo {}

export default function ListItem({
    id,
    description, 
    dueDate, 
    handleUpdate,
    handleDelete
}: Todo) {
    return (
        <div>
            <li>
                <p>{description}</p> 
                {/* {dueDate && <p>Due: {dueDate}</p>} */}
                <p>Due: {dueDate}</p>
                <button onClick={() => handleUpdate(id)}>Mark Completed</button>
                <button onClick={() => handleDelete(id)}>Delete Todo</button>
            </li>
        </div>
    )
}
