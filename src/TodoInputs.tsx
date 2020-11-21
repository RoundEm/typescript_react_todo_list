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
            [e.target.name]: e.target.value
        }
        setValues(updatedValues)
    }

    function handleAddTodoAndInputClear(e: any): void {
        e.preventDefault()
        setValues({ description: '', dueDate: '' })
        handleAdd(values)
    }

    return (
        <form onSubmit={(e) => handleAddTodoAndInputClear(e)}>
            <input 
                type="text"
                name="description"
                value={values.description}
                onChange={e => handleInputChange(e)}
                placeholder="Add todo..."
                required
            />

            <input 
                type="date"
                name="dueDate"
                value={values.dueDate}
                onChange={e => handleInputChange(e)}
                placeholder="Date due..."
                required
            />

            <br />
            <button
                type="submit"
            >
                Add Todo
            </button>
        </form>
    )
}
