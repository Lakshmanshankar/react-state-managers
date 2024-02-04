import { atom } from 'jotai'
import { Todo, Todostatus } from '@/Todos/shared'

export const todoAtom = atom<Todo[]>([]);

export const addTodoAtom = atom(null, (get, set, newTodo: Todo) => {
  set(todoAtom, () => [...get(todoAtom), newTodo])
  console.log(get(todoAtom))
})

export const changeTodoStatusAtom = atom(null, (get, set, currentTodo: Todo, newStatus: Todostatus) => {
  set(todoAtom, () => {
    const changedTodos = get(todoAtom).map((todo) => {
      if (todo.index === currentTodo.index) {
        todo.status = newStatus;
      }
      return todo;
    });
    return changedTodos;
  });
})

export const deleteTodoAtom = atom(null, (get, set, deleteTodo: Todo) => {
  set(todoAtom, () => {
    const deletedTodos = get(todoAtom).filter((todo) => todo.index !== deleteTodo.index);
    return deletedTodos;
  });
});