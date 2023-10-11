import { useEffect,useState } from "react";
import styles from "./App.module.css";
import NewTaskCreator from "./Components/NewTaskCreator";
import ExistingTasks from "./Components/ExistingTasks";

const BASE_URL = "http://localhost:3333/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const doneTasks = tasks.filter((tasks) => tasks.completed)

  useEffect(() => {
    fetch("http://localhost:3333/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  async function handleSubmit(formData) {
    const res = await fetch("http://localhost:3333/tasks", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...formData, completed: false }),
    });
    const data = await res.json();

    setTasks([...tasks, data]);
  }

  async function handleCheckedChange(id, checked) {
    await fetch("http://localhost:3333/tasks/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ completed: checked }),
    });

    const newTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: checked } : task
    );
    setTasks(newTasks);
  }

  async function handleDelete(id) {
    await fetch("http://localhost:3333/tasks/" + id, {
      method: "DELETE",
    });
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <div>
      <h1>Minhas tarefas</h1>

      <NewTaskCreator onSubmit={handleSubmit}/>
      <ul>
      {tasks.map((task) => (
            <ExistingTasks
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onCheckedChange={handleCheckedChange}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
