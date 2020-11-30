import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Todo } from './Types'
import TodoInputs from './TodoInputs'
import ListItem from './ListItem'

// TODO: 
// - refactor routes to syntax that sanitizes dynamic values?
// - setup priority?
// - setup due_date editing?
// - setup useEffect to clear inputs only when todo has been added (need to use `useRef`?)?

export default function TodoList() {
    const [todos, setTodos] = useState([])
    // console.log('todos: ', todos)

    useEffect(() => {
        axios.get('/todos')
            .then((res) => {
                // console.log('get todos res: ', res)
                setTodos(res.data)
            })
            .catch((err) => {
                console.log('get todos err: ', err)
            })
    }, [])

    const completedTodos = todos.filter((todo: Todo) => {
        return todo.completed
    })

    const incompleteTodos = todos.filter((todo: Todo) => {
        return !todo.completed
    })

    const sortTodos = (todos: Todo[]): Todo[] => {
        return todos.sort((a: Todo, b: Todo) => {
            return a.due_date > b.due_date ? 1 : -1
        })
    }

    function handleToggleCompleted(
        todoId: string, completed: boolean
    ): void {
        axios.put(`/todos/${todoId}/${!completed}`)
            .then((res) => {
                // console.log('toggle res: ', res)
                window.location.reload()
            })
            .catch((err) => {
                console.log('post err: ', err)
            })
    }

    function handleDeleteTodo(todoId: string): void {
        axios.delete(`/todos/${todoId}`)
            .then((res) => {
                // console.log('delete todo res: ', res)
                window.location.reload()
            })
            .catch((err) => {
                console.log('get todos err: ', err)
            })
    }

    function handleAddTodo(
        { description, due_date }: any
    ): void {
        const newTodo = {
            description,
            due_date,
        }
        axios.post('/todos', newTodo)
            .then((res) => {
                console.log('post res: ', res)
                window.location.reload()
            })
            .catch((err) => {
                console.log('post err: ', err)
            })
    }

    // TODO: refactor handleToggleCompleted to handle complete all too?
    function handleCompleteAll(): void {
        // TODO: change to Promise.all??
        for (const { id } of incompleteTodos) {
            axios.put(`/todos/${id}/${true}`)
                .then(res => {
                    console.log(`complete all res for ${id}: `, res)
                })
                .catch(err => console.log(`complete all err for ${id}: `, err))
        }
    }

    return (
        <>
            <h1>TODO List</h1>
            <h2>Built with TypeScript, React, Express, & Postgres</h2>

            <TodoInputs handleAdd={handleAddTodo} />

            <button onClick={handleCompleteAll}>
                Mark All Todos Completed
            </button>

            <ul>
                {sortTodos(incompleteTodos).map((todo: any) => {
                    return (
                        <ListItem 
                            id={todo.id} 
                            key={todo.id}
                            description={todo.description} 
                            due_date={todo.due_date} 
                            completed={todo.completed}
                            handleToggleCompleted={handleToggleCompleted}
                            handleDelete={handleDeleteTodo}
                        />
                    )
                })}
            </ul>
            
            {/* TODO: double check this logic when toggleTodo is refactored and look into warning about mixing && and || operators */}
            {<h2>Completed Todos</h2>}

            <ul>
                {sortTodos(completedTodos).map((todo: any) => {
                    return (
                        <ListItem 
                            id={todo.id} 
                            key={todo.id}
                            description={todo.description} 
                            due_date={todo.due_date} 
                            completed={todo.completed}
                            handleToggleCompleted={handleToggleCompleted}
                            handleDelete={handleDeleteTodo}
                        />
                    )
                })}
            </ul>
        </>
    )
}


// function handleToggleCompleted(todo: Todo): Todo => {
//     return {
//         id: todo.id,
//         description: todo.description,
//         due_date: todo.due_date,
//         completed: !todo.completed
//     }
// }
