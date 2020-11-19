import React, { useState, useEffect } from 'react'
import ListItem from './ListItem'

const initialTodos = [
    { id: 1, description: 'AAAAA', completed: false, dueDate: '11/30/20'},
    { id: 2, description: 'FFFFF', completed: false, dueDate: '12/15/20'}
]

export default function TodoList() {
    const [todos, setTodos] = useState(initialTodos)
    return (
        <ul>
            {todos.map(todo => {
                return (
                    <ListItem 
                        id={todo.id} 
                        description={todo.description} 
                        dueDate={todo.dueDate} 
                        completed={todo.completed}
                    />
                )
                
            })}
        </ul>
    )
}
