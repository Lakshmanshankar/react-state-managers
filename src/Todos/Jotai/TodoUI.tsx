import { Button } from "@/components/ui/button";
import { addTodoAtom, changeTodoStatusAtom, deleteTodoAtom, todoAtom } from "./Todo";
import { defaultTodo, type Todo } from "@/Todos/shared";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

// Render Comp Imports
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Todostatus } from "@/Todos/shared";
import React from "react";
import { PageLinks } from "@/components/ui/shared/Links";
import { useAtom } from "jotai";

export default function TodoUI() {
    console.log("[JOTAI] INPUT RENDERED");
    const [maxIndex, setMaxIndex] = useState(0);
    const [todo, setTodo] = useState<Todo>(defaultTodo);
    const [error, setError] = useState({
        name: false,
        status: "",
        description: "",
    });

    const [, addTodo] = useAtom(addTodoAtom);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (todo.name.trim() === "") {
            setError({
                name: true,
                status: "",
                description: "Please give name for todo",
            });
            return;
        }

        addTodo({
            ...todo,
            index: maxIndex,
        });

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
            <div className=" w-full flex items-center justify-center dark:bg-zinc-950 py-10">
                <div className={"inter"}>
                    <Card className="py-4 w-full px-2 shadow-sm inter-reg">
                        <h1 className="text-2xl dark:text-white text-center">
                            Jotai Todo App
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
                                        <AlertCircle size={16} className="m-1" />
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
                </div>
            </div>
        </div>
    );
}

export const JotaiRenderTable = (function RenderTodoTables() {
    const [todos] = useAtom(todoAtom);
    const [, changeStatus] = useAtom(changeTodoStatusAtom);
    const [, deleteTodo] = useAtom(deleteTodoAtom);

    console.log("[JOTAI] TABLE RENDERED");

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        todo: Todo
    ) => {
        changeStatus(todo, e.target.value as Todostatus);
    };
    return (
        <div className=" w-full flex justify-center items-center">
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
                        {todos.map((todo) => (
                            <TableRow key={todo.index}>
                                <TableCell className="font-medium">{todo.name}</TableCell>
                                <TableCell>
                                    <select
                                        value={todo.status}
                                        onChange={(e) => handleChange(e, todo)}
                                        className=" py-2 px-5 dark:bg-neutral-900 "
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
                            <TableCell colSpan={2}>Total:</TableCell>
                            <TableCell colSpan={3}>{todos.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Card>
        </div>
    );
});

export function CheckJotai() {
    console.log("[JOTAI] CHECK RENDERED");
    const [, addTodo] = useAtom(addTodoAtom);
    return (
        <div className="w-full grid place-content-center text-2xl py-10 ">
            <h1 className="dark:text-white text-center">Add Random Todo,</h1>
            <Button className="px-10 w-fit" onClick={() => {
                addTodo({ index: Math.random() * 120, name: 'SOme strange Todoo', status: 'In Progress' })
            }}> Add Random Todo</Button>
        </div>
    )
}
