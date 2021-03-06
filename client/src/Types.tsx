// "Readonly" is a "MappedType" that makes Todos immutable
export type Todo = Readonly<{
    id: string
    description: string
    completed: boolean
    due_date: string
}>

export type TodoActions = {
    handleToggleCompleted: (todoId: string, completed: boolean) => void
    handleDelete: (todoId: string) => void
}

// Intersection
export type TodoProps = Todo & TodoActions

// Why this error: Re-exporting a type when the '--isolatedModules' flag is provided requires using 'export type'.
// export { Todo as default,TodoActions, TodoProps }