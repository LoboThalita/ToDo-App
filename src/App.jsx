import { useEffect, useState } from "react";
import styles from "./ModulesCss/App.module.css";
import NewTaskCreator from "./Components/NewTaskCreator";
import ExistingTasks from "./Components/ExistingTasks";
import Filter from "./Components/Filter";

const BASE_URL = "http://localhost:3333/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const doneTasks = tasks.filter((tasks) => tasks.completed);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  async function handleSubmit(formData) {
    const res = await fetch(BASE_URL, {
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
    await fetch(BASE_URL + "/" + id, {
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
    await fetch(BASE_URL + "/" + id, {
      method: "DELETE",
    });
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }
  function handleChangeFilter(){

  }

  return (
    <main className={styles.main}>
      <h1>Minhas Tarefas</h1>

      <NewTaskCreator onSubmit={handleSubmit} />
      
      {tasks.length != 0 ? <Filter tasks={tasks} onCheckedFilter={handleChangeFilter} /> : <p></p>}
      <ul className={styles.taskList}>
        {tasks.length === 0 ? (
          <p>Nenhuma tarefa foi adicionada.</p>
        ) : (
          
          tasks.map((task) => (
            <ExistingTasks
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onCheckedChange={handleCheckedChange}
            />
          ))
        )}
      </ul>
    </main>
  );
}

export default App;
