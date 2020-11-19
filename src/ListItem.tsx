import React from 'react'

export interface Props {
    id: number,
    description: string,
    completed: boolean,
    dueDate: string
}

export default function ListItem({id, description, dueDate}: Props) {
    return (
        <div>
            <li key={id}>
                <p>{description}</p> 
                <p>Due: {dueDate}</p>
                <button>Mark Completed</button>
            </li>
        </div>
    )
}
