// Using Reducer to manage state 
import { Todo, Todostatus } from '@/Todos/shared';
import { Dispatch, createContext, useContext, useReducer } from 'react';

export enum TodoActions {
    ADD_TODO = 'ADD_TODO',
    CHANGE_STATUS = 'CHANGE_STAUTUS',
    REMOVE_TODO = 'REMOVE_TODO'
}

interface AddTodoAction {
    type: TodoActions.ADD_TODO;
    payload: Todo;
}

interface ChangeStatusAction {
    type: TodoActions.CHANGE_STATUS;
    payload: { todo: Todo; status: Todostatus };
}

interface RemoveTodoAction {
    type: TodoActions.REMOVE_TODO;
    payload: { index: number };
}

type TodoAction = AddTodoAction | ChangeStatusAction | RemoveTodoAction;

interface TodoContextType {
    state: Todo[];
    dispatch: Dispatch<TodoAction>;
}

const todoReducer = (state: Todo[], action: TodoAction) => {
    switch (action.type) {
        case TodoActions.ADD_TODO:
            return [...state, action.payload];

        case TodoActions.CHANGE_STATUS:
            return state.map((currentTodo) => {
                if (currentTodo.index === action.payload.todo.index) {
                    return { ...currentTodo, status: action.payload.status };
                }
                return currentTodo;
            });

        case TodoActions.REMOVE_TODO:
            return state.filter((todo) => todo.index !== action.payload.index);

        default:
            console.log('default case');
            return state;
    }
};

const TodoContext = createContext({} as TodoContextType);

export const TodoReducerProvider = ({ children }: { children: React.ReactNode }) => {
    const [state,dispatch]= useReducer(todoReducer, []);
    return <TodoContext.Provider value={{state,dispatch}}>{children}</TodoContext.Provider>
}

export const useTodoReducer = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('Unable to read context TodoContext');
    }
    return context;
};