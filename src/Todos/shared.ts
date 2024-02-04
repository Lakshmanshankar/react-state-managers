export type Todostatus = "Not started" | "In Progress" | "completed";

export type Todo = {
  index: number;
  name: string;
  status: Todostatus;
};

export interface TodoProps {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  changeStatus: (todo: Todo, status: Todostatus) => void;
  deleteTodo: (todo: Todo) => void;
}

export const defaultTodo = { name: "", status: "Not started", index: 0 } as Todo;
