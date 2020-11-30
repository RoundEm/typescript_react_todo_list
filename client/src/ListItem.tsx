import React from 'react'
import { TodoProps } from './Types'

export default function ListItem({
    id,
    description, 
    due_date, 
    completed,
    handleToggleCompleted,
    handleDelete
}: TodoProps) {
    const month = new Date(due_date).getMonth()+1
    const date = new Date(due_date).getDate()
    const year = new Date(due_date).getFullYear()
    const fullDueDate = `${month}/${date}/${year}`
    return (
        <div>
            <li className={completed ? 'completedTodo' : ''}>
                <p>{description}</p> 
                {/* {fullDueDate && <p>Due: {fullDueDate}</p>} */}
                <p>Due: {fullDueDate}</p>
                <button onClick={() => handleToggleCompleted(id, completed)}>
                    {completed ? 'Mark Incompleted' : 'Mark Completed'}
                </button>
                <button onClick={() => handleDelete(id)}>Delete Todo</button>
            </li>
        </div>
    )
}
