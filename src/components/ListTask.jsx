import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ListTask = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInprogress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const filterTodo = tasks.filter((task) => task.status === "todo");
    const filterInprogress = tasks.filter(
      (task) => task.status === "inprogress"
    );
    const filterDone = tasks.filter((task) => task.status === "done");

    setTodos(filterTodo);
    setInprogress(filterInprogress);
    setDone(filterDone);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "done"];

  return (
    <div style={{ display: "flex", gap: "100px" }}>
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}
    </div>
  );
};

export default ListTask;

function Section({ status, tasks, setTasks, todos, inProgress, done }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function addItemToSection(id) {
    setTasks((prev) => {
      const modifyTasks = prev.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      });
      return modifyTasks;
    });
  }

  let tasksToMap = todos;

  if (status === "inprogress") {
    tasksToMap = inProgress;
  }

  if (status === "done") {
    tasksToMap = done;
  }

  return (
    <div
      ref={drop}
      style={{
        width: "300px",
        backgroundColor: `${isOver ? " rgb(226 232 240)" : ""}`,
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>{status} list</h2>
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} tasks={tasks} setTasks={setTasks} task={task} />
        ))}
    </div>
  );
}

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  function handleRemove(id) {
    const filterTask = tasks.filter((task) => task.id != id);
    setTasks(filterTask);
  }

  return (
    <div
      ref={drag}
      style={{
        position: "relative",
        boxShadow: " 0 0 10px 0 rgba(0, 4, 4, 0.2)",
        borderRadius: "10px",
        padding: "4px",
        cursor: "grab",
        marginBottom: "8px",
        height: "auto",
        opacity: `${isDragging ? "0.25" : "1"}`,
      }}
    >
      <p>{task.name}</p>
      <button
        style={{ position: "absolute", top: "20%", right: "2%" }}
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
};
