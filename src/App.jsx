import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateTask from "./components/CreateTask.jsx";
import ListTask from "./components/ListTask.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [tasks, setTasks] = useState([]);

  console.log("taksssssss", tasks);

  return (
    <DndProvider backend={HTML5Backend}>
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTask tasks={tasks} setTasks={setTasks} />
    </DndProvider>
  );
}

export default App;
