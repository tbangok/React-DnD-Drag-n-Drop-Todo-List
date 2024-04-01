import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({ id: "", name: "", status: "todo" });

  const handleSubmit = (e) => {
    e.preventDefault();

    //prevent empty task
    if (task.name.length <= 2)
      return alert("Task must have more than 2 characters");

    setTasks((prev) => {
      const list = [...prev, task];
      return list;
    });

    setTask({ id: "", name: "", status: "todo" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        style={{
          border: "2px solid gray   ",
          borderRadius: "10px",
          padding: "8px",
          marginRight: "4px",
        }}
        value={task.name}
        onChange={(e) => {
          setTask({ ...task, id: crypto.randomUUID(), name: e.target.value });
        }}
      />
      <button>Create</button>
    </form>
  );
};

export default CreateTask;
