import {create} from 'zustand'
import { Todo, TodoProps, Todostatus } from '@/Todos/shared'

export const useZustandTodos = create<TodoProps>()((set) => ({
    todos: [],
    addTodo: (todo: Todo) => set((state) => ({ todos: [...state.todos, todo] })),
    deleteTodo: (removable: Todo) => set((state) => ({ todos: state.todos.filter((todo) => todo.index !== removable.index) })),
    changeStatus: (currentTodo: Todo, status: Todostatus) => set((state) => ({ todos: state.todos.map((todo) => (todo.index === currentTodo.index ? { ...todo, status } : todo) ) })),
}))