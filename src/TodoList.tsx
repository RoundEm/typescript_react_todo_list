import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import TodoInputs from './TodoInputs'
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
    // console.log('todos: ', todos)

    const completedTodos = todos.filter(todo => {
        return todo.completed
    })

    const incompleteTodos = todos.filter(todo => {
        return !todo.completed
    })

    function handleToggleTodo(todoId: string): void {
        const updatedTodos = todos.map(todo => {
            return todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo
        })
        setTodos(updatedTodos)
    }

    function handleDeleteTodo(todoId: string): void {
        const filteredTodos = todos.filter(todo => todo.id !== todoId)
        setTodos(filteredTodos)
    }

    function handleAddTodo({ description, dueDate }: any): void {
        const newTodo = {
            id: uuid(),
            description,
            dueDate,
            completed: false,
        }
        setTodos(todos => [...todos, newTodo])
    }

    return (
        <>
            <h1>TypeScript/React Todo List</h1>

            <TodoInputs 
                handleAdd={handleAddTodo}
            />

            <ul>
                {incompleteTodos.map(todo => {
                    return (
                        <ListItem 
                            id={todo.id} 
                            key={todo.id}
                            description={todo.description} 
                            dueDate={todo.dueDate} 
                            completed={todo.completed}
                            handleUpdate={handleToggleTodo}
                            handleDelete={handleDeleteTodo}
                        />
                    )
                })}
            </ul>

            <h2>Completed Todos</h2>
            <ul>
                {completedTodos.map(todo => {
                    return (
                        <ListItem 
                            id={todo.id} 
                            key={todo.id}
                            description={todo.description} 
                            dueDate={todo.dueDate} 
                            completed={todo.completed}
                            handleUpdate={handleToggleTodo}
                            handleDelete={handleDeleteTodo}
                        />
                    )
                })}
            </ul>
        </>
    )
}
