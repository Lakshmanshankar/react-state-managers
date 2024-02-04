import React, { Dispatch, SetStateAction, useState } from "react";
import { Todo, Todostatus, defaultTodo } from "../shared";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from "@/components/ui/table";
import { PageLinks } from "@/components/ui/shared/Links";

export default function TodoUI() {
  console.log("STATE INPUT RENDERED");
  const [maxIndex, setMaxIndex] = useState(0);
  const [todo, setTodo] = useState<Todo>(defaultTodo);
  const [error, setError] = useState({
    name: false,
    status: "",
    description: "",
  });

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (todo.name.trim() === "") {
      setError({
        name: true,
        status: "",
        description: "This field cannot be empty",
      });
      return;
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        ...todo,
        index: maxIndex,
      },
    ]);

    setMaxIndex((prevIndex) => prevIndex + 1);
    setTodo(defaultTodo);
    setError({ name: false, status: "", description: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      name: e.target.value,
    });

    if (e.target.value.trim() !== "") {
      setError({ name: false, status: "", description: "" });
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <PageLinks />
      <div className="flex items-center justify-center py-10">
        <div className={"inter"}>


          <Card className="py-4 w-full px-2 shadow-sm inter-reg">
            <h1 className="text-2xl dark:text-white text-center">
              State Todo
            </h1>

            <form action="" className="w-full flex py-2 justify-between">
              <div className="w-full flex flex-col inter-reg">
                <Input
                  type="text"
                  className="border-2 border-gray-500"
                  value={todo.name}
                  onChange={handleChange}
                />
                {error.name && (
                  <div className="inter-reg flex items-center justify-start text-red-500 text-md">
                    <AlertCircle size={20} className="" />
                    {error.description}
                  </div>
                )}
              </div>
              <Button
                className="inter-reg ml-2 font-extrabold px-10 py-2 hover:bg-opacity-40 transition-all"
                onClick={(e) => handleClick(e)}
              >
                Add Todo
              </Button>
            </form>
          </Card>
          {todos && <RenderTodoTables todoProps={{ todos, setTodo, setTodos }} />}
          <CheckState todoProps={{ todos, setTodo, setTodos }} />
        </div>
      </div>
    </div>
  );
}

interface TodoProps {
  todos: Todo[];
  setTodo: Dispatch<SetStateAction<Todo>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

interface TodoTableProps {
  todoProps: TodoProps;
}

const RenderTodoTables = React.memo(function RenderTodoTable({
  todoProps,
}: TodoTableProps) {

  console.log("[STATE] TABLE RENDERED");
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    todo: Todo
  ) => {
    e.preventDefault();

    todoProps.setTodos((prev) => {
      const newTodos = prev.map((ptodo) => {
        if (ptodo.index === todo.index) {
          ptodo.status = e.target.value as Todostatus
        }
        return ptodo;
      })
      return newTodos;
    })
  };

  const deleteTodo = (todo: Todo) => {
    todoProps.setTodos((prev) => {
      const newTodos = prev.filter((prevTodo) => {
        return prevTodo.index !== todo.index;
      })
      return newTodos;
    })
  }

  return (
    <div className=" w-full flex justify-center items-center py-10">
      <Card className="py-4 min-w-96 px-2 shadow-sm inter-reg">
        <Table>
          <TableCaption>A list of your recent Todo</TableCaption>
          <TableHeader>
            <TableRow key={0}>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delete </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {todoProps.todos.map((todo) => (
              <TableRow key={todo.index}>
                <TableCell className="font-medium">{todo.name}</TableCell>
                <TableCell>
                  <select
                    value={todo.status}
                    onChange={(e) => handleChange(e, todo)}
                    className=" py-2 px-5 dark:bg-neutral-900"
                  >
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteTodo(todo)}> Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell colSpan={3}>{todoProps.todos.length}</TableCell>

            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  );
});
function CheckState(todoprops: TodoTableProps) {
  console.log("[STATE] CHECK RERENDERED");

  const randomeTodo: Todo = { index: Math.random() * 120, name: 'SOme strange Todoo', status: 'In Progress' };
  return (
    <div className="w-full grid place-content-center text-2xl py-10 ">
      <h1 className="dark:text-white text-center">Add Random Todo,</h1>
      <Button className="px-10 w-fit" onClick={() => {
        todoprops.todoProps.setTodos((prev) => [...prev, randomeTodo])
      }}> Add Random Todo</Button>
    </div>
  )
}