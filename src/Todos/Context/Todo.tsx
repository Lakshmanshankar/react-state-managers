import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { TodoProps,Todo,Todostatus } from "@/Todos/shared";

const initialTodos = {} as TodoProps;
const TodoContext = createContext(initialTodos);

export const TodoProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const values = useTodoHelper();
  return (
    <TodoContext.Provider value={values}>
      {children}
    </TodoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("Unable to read context TodoContext");
  }
  return context;
};

const useTodoHelper = ():TodoProps => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const changeStatus = (statusTodo: Todo, newStatus: Todostatus) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) => {
        if (todo.index === statusTodo.index) {
          todo.status = newStatus;
        }
        return todo;
      });
      return newTodos;
    });
  };

  const deleteTodo = (deleteTodo: Todo) => {
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => todo.index !== deleteTodo.index);
      return newTodos;
    });
  };

  return {
    todos,
    changeStatus,
    addTodo,
    deleteTodo,
  };
};
