import "./App.css";
import ReducerTodo from "@/Todos/Reducer/TodoUI";

function App() {
  console.log("APP RENRENDERED")
  return (
    <div className="flex dark:bg-zinc-950 ">
      <div className="w-full flex flex-col items-center justify-center">
        <ReducerTodo />
      </div >
    </div>
  );
}

export default App;

