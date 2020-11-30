import React, { useState } from 'react'

// export interface TodoInput {
//     description: string
//     due_date?: string
//     handleAdd: () => void
// }

// export interface Props {
//     handleAddTodo: (values: object) => void
// }

export default function TodoInput({ handleAdd }: any) {
    const [values, setValues] = useState({
        description: '',
        due_date: ''
    })
    // console.log('values: ', values)

    function handleInputChange(e: any): void {
        const updatedValues = {
            ...values,
            [e.target.id]: e.target.value
        }
        setValues(updatedValues)
    }

    function handleAddTodoAndInputClear(e: any): void {
        e.preventDefault()
        handleAdd(values)
        setValues({ description: '', due_date: '' })
    }

    return (
        <form onSubmit={(e) => handleAddTodoAndInputClear(e)}>
            <div id="descriptionInputContainer">
                <label htmlFor="description">Todo</label>
                <input 
                    type="text"
                    id="description"
                    value={values.description}
                    onChange={e => handleInputChange(e)}
                    placeholder="Make todo list with TypeScript and React"
                    required
                />
            </div>

            <div id="dueDateInputContainer">
                <label htmlFor="due_date">Due Date</label>
                <input 
                    type="date"
                    id="due_date"
                    value={values.due_date}
                    onChange={e => handleInputChange(e)}
                    placeholder="Date due..."
                    // required
                />
            </div>
            
            <button
                type="submit"
            >
                Add Todo
            </button>
        </form>
    )
}
