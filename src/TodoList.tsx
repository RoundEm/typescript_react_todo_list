import React, { useState, useEffect } from 'react'
import ListItem from './ListItem'

const initialTodos = [
    { id: '1', description: 'AAAAA', completed: false, dueDate: '11/30/20'},
    { id: '2', description: 'FFFFF', completed: false, dueDate: '12/15/20'},
    { id: '3', description: 'YYYYY', completed: false}
]

export interface Todo {
    id: string
    description: string
    completed: boolean
    dueDate?: string
    handleUpdate: (todoId: string) => void
    handleDelete: (todoId: string) => void
}

export default function TodoList() {
    const [todos, setTodos] = useState(initialTodos)
    console.log('todos: ', todos)

    function handleUpdateTodo(todoId: string): void {
        console.log('handleUpdate')
        const updatedTodos = todos.map(todo => {
            return todo.id === todoId
                ? {
                    ...todo,
                    completed: !todo.completed
                }
                : todo
        })
        setTodos(updatedTodos)
    }

    function handleDeleteTodo(todoId: string): void {
        console.log('handleDelete')
        const filteredTodos = todos.filter(todo => todo.id !== todoId)
        setTodos(filteredTodos)
    }

    return (
        <ul>
            {todos.map(todo => {
                return (
                    <ListItem 
                        id={todo.id} 
                        key={todo.id}
                        description={todo.description} 
                        dueDate={todo.dueDate} 
                        completed={todo.completed}
                        handleUpdate={handleUpdateTodo}
                        handleDelete={handleDeleteTodo}
                    />
                )
            })}
        </ul>
    )
}
