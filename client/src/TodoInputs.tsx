import React, { useState } from 'react'

// export interface TodoInput {
//     description: string
//     dueDate?: string
//     handleAdd: () => void
// }

// export interface Props {
//     handleAddTodo: (values: object) => void
// }

export default function TodoInput({ handleAdd }: any) {
    const [values, setValues] = useState({
        description: '',
        dueDate: ''
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
        setValues({ description: '', dueDate: '' })
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
                <label htmlFor="dueDate">Due Date</label>
                <input 
                    type="date"
                    id="dueDate"
                    value={values.dueDate}
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
