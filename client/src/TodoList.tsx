import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { Todo } from './Types'
import TodoInputs from './TodoInputs'
import ListItem from './ListItem'

// const initialTodos: Todo[] = [
//     // { id: '2', description: 'FFFFF', completed: false, dueDate: '2020-12-24'},
//     // { id: '1', description: 'AAAAA', completed: false, dueDate: '2020-11-30'},
//     // { id: '3', description: 'YYYYY', completed: false, dueDate: '2021-01-15'}
// ]

// TODO: 
// - persist
// - setup priority?
// - setup dueDate edit?
// - setup useEffect to clear inputs only when todo has been added (need to use `useRef`?)?

export default function TodoList() {
    const [todos, setTodos] = useState([])
    // const [clearInputs, setClearInputs] = useState(false)
    // console.log('todos: ', todos)

    useEffect(() => {
        axios.get('/todos')
            .then((res) => {
                console.log('get todos res: ', res)
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
            return a.dueDate > b.dueDate ? 1 : -1
        })
    }

    // TODO: why doesn't updatedTodos: Todo[]` work
    function handleToggleCompleted(todoId: string): void {
        const updatedTodos: any = todos.map((todo: Todo) => {
            return todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo
        })
        setTodos(updatedTodos)
    }

    function handleDeleteTodo(todoId: string): void {
        const filteredTodos = todos.filter((todo: Todo) => todo.id !== todoId)
        setTodos(filteredTodos)
    }

    function handleAddTodo({ description, dueDate }: any): void {
        const newTodo = {
            description,
            dueDate,
            // id: uuid(),
            // completed: false,
        }
        // setTodos(todos => [...todos, newTodo])
        axios.post('/todos', newTodo)
            .then((res) => {
                console.log('post res: ', res)
            })
            .catch((err) => {
                console.log('post err: ', err)
            })
    }

    // TODO: refactor handleToggleCompleted to handle complete all too?
    // TODO: why doesn't completedTodos: Todo[]` work
    function handleCompleteAll(): void {
        const completedTodos: any = todos.map((todo: Todo) => {
            return !todo.completed 
                ? { ...todo, completed: true }
                : todo
        })
        setTodos(completedTodos)
    }

    return (
        <>
            <h1>TypeScript/React Todo List</h1>

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
                            dueDate={todo.dueDate} 
                            completed={todo.completed}
                            handleToggleCompleted={handleToggleCompleted}
                            handleDelete={handleDeleteTodo}
                        />
                    )
                })}
            </ul>
            
            <h2>Completed Todos</h2>
            <ul>
                {sortTodos(completedTodos).map((todo: any) => {
                    return (
                        <ListItem 
                            id={todo.id} 
                            key={todo.id}
                            description={todo.description} 
                            dueDate={todo.dueDate} 
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
//         dueDate: todo.dueDate,
//         completed: !todo.completed
//     }
// }
